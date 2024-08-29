import dagre from '@dagrejs/dagre'

function layout(nodes, edges, width = 200, height = 100) {
  const SPACING = 40
  const graph = new dagre.graphlib.Graph().setGraph({ rankdir: 'LR' })

  const connectedIds = new Set()
  for (let edge of edges) {
    connectedIds.add(edge.source)
    connectedIds.add(edge.target)
  }

  const connectedNodes = nodes.filter(n => connectedIds.has(n.id))
  const nonConnectedNodes = nodes.filter(n => !connectedIds.has(n.id))

  for (let node of connectedNodes) {
    graph.setNode(node.id, { width, height })
  }

  for (let edge of edges) {
    graph.setEdge(edge.source, edge.target)
  }

  dagre.layout(g)

  const positionedNodes = g.nodes()
    .map(id => {
      const { x, y } = g.node(id);
      return { id, x, y };
    });

  const edges = g.edges()
    .map(({v, w}) => ({
      source: g.node(v),
      target: g.node(w),
    }))

  const { width, height } = g.graph()

  for (let i = 0; i < nonConnectedNodes.length; i++) {
    const node = nonConnectedNodes[i]
    positionedNodes.push({
      id: node.id,
      y: height + 200,
      x: width + ((width + SPACING) * i)
    })
  }

  return {
    nodes: positionedNodes,
    edges,
    width,
    height
  }
}