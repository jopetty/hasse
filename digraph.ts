// digraph.ts
// 
// An implementation of a directed graph
// 
// Created by Jackson Petty on 29 November 2022.

import { OrderedSet } from "./orderedSet";

export class HSNode {

  readonly label: string;

  constructor(withLabel: string) {
    this.label = withLabel;
  }

  public equals(obj: HSNode) : boolean {
    return this.label === obj.label;
  }
}

export class HSDigraph {

  nodes: OrderedSet<HSNode>;
  adjacencyRelations: Array<[HSNode, HSNode]>;

  constructor(nodeList: OrderedSet<HSNode>) {
    if (nodeList) {
      this.nodes = nodeList;
    } else {
      this.nodes = new OrderedSet("HSNode");
    }
    this.nodes = nodeList;
    this.adjacencyRelations = [];
  }

  public removeNode(node: HSNode) {
    const nodeIndex: number = this.nodes.indexOf(node);

    if (nodeIndex > -1) {
      this.nodes.splice(nodeIndex, 1);
    } else {
      console.log(`Node ${node} not found in graph.`);
      return;
    }

    var nodeRelationIndices: Array<number> = [];
    for (var i = 0; i < nodeRelationIndices.length; i++) {
      if (this.adjacencyRelations[i][0] === node || 
          this.adjacencyRelations[i][1] === node) {
        nodeRelationIndices.push(i)
      }
    }

    for (var relIdx of nodeRelationIndices) {
      this.adjacencyRelations.splice(relIdx, 1);
    }
  }

  addNode(node: HSNode) {
    this.nodes.push(node);
  }

  addRelation(rel: [HSNode, HSNode]) {
    this.adjacencyRelations.push(rel);
  }

  getSuperiorNodes(ofNode: HSNode) {
    // return all nodes which dominate this node
  }

  getInferiorNodes(ofNode: HSNode) {
    // return all nodes which this node dominates
  }

  getAdjacencyMatrix() : number[][] {

    // Returns an adjacency matrix for the graph where
    // a '1' in position (row, col) means that the node
    // at index 'row' dominates the node at index 'col'.

    const n = this.nodes.length;
    var matrix: number[][] = new Array(n)
      .fill(0)
      .map(() =>
        new Array(n).fill(0)
    );
    
    for (var rel of this.adjacencyRelations) {
      const row: number = this.nodes.indexOf(rel[0]);
      const col: number = this.nodes.indexOf(rel[1]);
      matrix[row][col] = 1;
    }

    return matrix;
  }

}