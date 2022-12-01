"use strict";
// digraph.ts
// 
// An implementation of a directed graph
// 
// Created by Jackson Petty on 29 November 2022.
Object.defineProperty(exports, "__esModule", { value: true });
exports.HSDigraph = exports.HSNode = void 0;
const orderedSet_1 = require("./orderedSet");
class HSNode {
    constructor(withLabel) {
        this.label = withLabel;
    }
    equals(obj) {
        return this.label === obj.label;
    }
}
exports.HSNode = HSNode;
class HSDigraph {
    constructor(nodeList) {
        if (nodeList) {
            this.nodes = nodeList;
        }
        else {
            this.nodes = new orderedSet_1.OrderedSet("HSNode");
        }
        this.nodes = nodeList;
        this.adjacencyRelations = [];
    }
    removeNode(node) {
        const nodeIndex = this.nodes.indexOf(node);
        if (nodeIndex > -1) {
            this.nodes.splice(nodeIndex, 1);
        }
        else {
            console.log(`Node ${node} not found in graph.`);
            return;
        }
        var nodeRelationIndices = [];
        for (var i = 0; i < nodeRelationIndices.length; i++) {
            if (this.adjacencyRelations[i][0] === node ||
                this.adjacencyRelations[i][1] === node) {
                nodeRelationIndices.push(i);
            }
        }
        for (var relIdx of nodeRelationIndices) {
            this.adjacencyRelations.splice(relIdx, 1);
        }
    }
    addNode(node) {
        this.nodes.push(node);
    }
    addRelation(rel) {
        this.adjacencyRelations.push(rel);
    }
    getSuperiorNodes(ofNode) {
        // return all nodes which dominate this node
    }
    getInferiorNodes(ofNode) {
        // return all nodes which this node dominates
    }
    getAdjacencyMatrix() {
        // Returns an adjacency matrix for the graph where
        // a '1' in position (row, col) means that the node
        // at index 'row' dominates the node at index 'col'.
        const n = this.nodes.length;
        var matrix = new Array(n)
            .fill(0)
            .map(() => new Array(n).fill(0));
        for (var rel of this.adjacencyRelations) {
            const row = this.nodes.indexOf(rel[0]);
            const col = this.nodes.indexOf(rel[1]);
            matrix[row][col] = 1;
        }
        return matrix;
    }
}
exports.HSDigraph = HSDigraph;
//# sourceMappingURL=digraph.js.map