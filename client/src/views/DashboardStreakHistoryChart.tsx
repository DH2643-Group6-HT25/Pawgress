import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import type { StreakHistoryObject } from '../models/streak/streakType'

interface PropTypes {
  streakHistory: StreakHistoryObject[]
}

const DashboardStreakHistoryChart = ({ streakHistory }: PropTypes) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current || streakHistory.length === 0) return

    // remove previous img
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const defaultwidth = 200
    const defaultheight = 120
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }

    const [minDate, maxDate] = d3.extent(
      streakHistory,
      (d) => new Date(d.date)
    ) as [Date, Date]

    // dynamic width for x-axis based on the date range, the min width for canvas is the default width
    const daySpan =
      (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    const tickXInterval = 32
    const width = Math.max(defaultwidth, daySpan * tickXInterval)

    // dynamic height for y-axis
    const maxTodoValue = d3.max(streakHistory, (d) => d.finishedTodos)!

    const tickYInterval = 20
    const height = Math.max(defaultheight, maxTodoValue * tickYInterval)

    console.log(width)
    console.log(height)

    //size of svg
    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    // draw white background
    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('rx', 16) // rounded corners for x axis
      .attr('ry', 16) // rounded corners for y axis
      .attr('fill', 'white')
      .attr('stroke', '#ddd') // gray stroke
      .attr('stroke-width', 1)

    // draw line chart within g
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // X scale - dates
    const x = d3
      .scaleTime()
      .domain([minDate, maxDate]) // Date[]
      .range([0, width]) // number[]

    const tickDates: Date[] = streakHistory.map((d) => new Date(d.date))

    // X axis with dates
    const xAxis = d3
      .axisBottom<Date>(x)
      .tickValues(tickDates as readonly Date[])
      .tickFormat(d3.timeFormat('%m-%d'))

    // Y scale - finishedTodos
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(streakHistory, (d) => d.finishedTodos)!])
      .nice()
      .range([height, 0])

    // Y axis with integers
    const yTicks = d3.range(0, maxTodoValue + 1, 1) // 0,1,2,...,maxValue
    const yAxis = d3.axisLeft(y).tickValues(yTicks).tickFormat(d3.format('d'))

    // Generate lines
    const line = d3
      .line<StreakHistoryObject>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.finishedTodos))

    // draw lines
    g.append('path')
      .datum(streakHistory)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line)

    // draw points
    g.selectAll('circle')
      .data(streakHistory)
      .join('circle')
      .attr('cx', (d) => x(new Date(d.date)))
      .attr('cy', (d) => y(d.finishedTodos))
      .attr('r', 4)
      .attr('fill', 'steelblue')

    // draw X axis
    g.append('g').attr('transform', `translate(0,${height})`).call(xAxis)

    // draw Y axis
    g.append('g').call(yAxis)

    // draw title for X axis
    g.append('text')
      .attr('x', width / 2) // center
      .attr('y', height + 25)
      .attr('text-anchor', 'middle') // text in center
      .attr('font-size', '12px')
      .text('Dates')

    // draw title for Y axis
    g.append('text')
      .attr('transform', 'rotate(-90)') // rotate
      .attr('x', -(height / 2)) // center
      .attr('y', -20) // leave space for left
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text('Amount of Todos')
  }, [streakHistory])

  return <svg ref={svgRef}></svg>
}

export default DashboardStreakHistoryChart
