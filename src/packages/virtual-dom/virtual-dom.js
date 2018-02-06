// @flow
import { encode } from 'base-64'
import type { Component, Children, Props, Node } from './types'

/**
 * Parse a JSX node to JavaScript
 * @param component
 * @param props
 * @param children
 * @returns {{component: Component, props: V.props, children: Children[]}}
 * @constructor
 */
function V (component: Component, props: Props, ...children: Children): Node {
  return {
    id: encode(JSON.stringify({ component, props, children })),
    component,
    props,
    children
  }
}

/**
 * Check if a node has updated
 * @param newNode
 * @param oldNode
 * @returns {boolean}
 */
function changed  (newNode: Node, oldNode: Node): boolean {
  return typeof newNode !== typeof oldNode || // If node1 is in any way different to node2
    typeof newNode === 'string' && newNode !== oldNode || // If both nodes are strings but are different
    typeof newNode.component !== oldNode.component // If both are Vapor components but are different
}
/**
 * Update a node
 * @param $parent
 * @param newNode
 * @param oldNode
 * @param index
 */
function updateNode ($parent: Object, newNode: Node, oldNode: Node, index: number = 0): void {
  // If no old node exists
  if (newNode && !oldNode) {
    $parent.appendChild(createNode(newNode))

  // If no old node or new node exist
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index])

  // If the node has changed
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createNode(newNode), $parent.childNodes[index])

  // If new node is an element (not a string)
  } else if (newNode.type) {
    const newLength: number = newNode.children.length
    const oldLength: number = oldNode.children.length

    for (let i: number = 0; i < newLength || i < oldLength; i++) {
      updateNode(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
}

/**
 * Create a node
 * @param node
 * @returns {*}
 */
function createNode (node: Node): Object {
  if (typeof node === 'string' || typeof node === 'number') {
    return document.createTextNode(String(node))
  }

  /*
    TODO
    - Create an ID to cache each component against - just stringify node.component + node.props (or stringify entire node???)
        - Is it worth base64'ing the ID? Potential to reduce memory usage per component by up to 1/4?
    - Check local cache to see if node has already been rendered
    - If no cached component is found then generate the component
    - If cached component is found pull it from storage (need good pattern/convention for storing components)
   */
  if (typeof node.component === 'function') {
    node.component = node.component(node.children)
    return createNode(node)
  }

  const $element: Object = document.createElement(node.component)

  node.children.map(function (child: Node): void {
    $element.appendChild(createNode(child))
  })

  return $element
}

/**
 * Render a Vapor app to the DOM
 * @param app
 * @param root
 */
function render (app: Node, root: Object): void {
  root.appendChild(createNode(app))
}

export default V
export {
  createNode,
  render,
  updateNode,
  changed
}
