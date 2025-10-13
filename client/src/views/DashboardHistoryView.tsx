import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { StreakHistoryObject } from "../models/streak/streakType";
import { MenuCard } from "../components/MenuCard";
import styled from "styled-components";
import streakImg from "../assets/streak.png";
import {
  InsideCard,
  InsideCardText,
  InsideCardTitle,
  InsideCardContainer,
} from "../components/CardComponents";

interface PropTypes {
  currentStreak: number;
  bestStreak: number;
  streakHistory: StreakHistoryObject[];
}

type ExtendedProps = PropTypes & { isLoading: boolean };

const DashboardHistoryView = ({
  currentStreak,
  bestStreak,
  streakHistory,
  isLoading,
}: ExtendedProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // remove previous img

    const width = 260;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // draw white background
    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 16) // rounded corners for x axis
      .attr("ry", 16) // rounded corners for y axis
      .attr("fill", "white")
      .attr("stroke", "#ddd") // gray stroke
      .attr("stroke-width", 1);

    const [minDate, maxDate] = d3.extent(streakHistory, (d) => d.date) as [
      Date,
      Date,
    ];

    // X scale - dates
    const x = d3
      .scaleTime()
      .domain([minDate, maxDate]) // Date[]
      .range([margin.left, width - margin.right]); // number[]

    const tickDates: Date[] = streakHistory.map((d) => d.date);

    // X axis with dates
    const xAxis = d3
      .axisBottom<Date>(x)
      .tickValues(tickDates as readonly Date[])
      .tickFormat(d3.timeFormat("%m-%d"));

    // Y scale - finishedTodos
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(streakHistory, (d) => d.finishedTodos)!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Y axis with integers
    const maxValue = d3.max(streakHistory, (d) => d.finishedTodos)!;
    const yTicks = d3.range(0, maxValue + 1, 1); // 0,1,2,...,maxValue
    const yAxis = d3.axisLeft(y).tickValues(yTicks).tickFormat(d3.format("d"));

    // Generate lines
    const line = d3
      .line<StreakHistoryObject>()
      .x((d) => x(d.date))
      .y((d) => y(d.finishedTodos));

    // draw lines
    svg
      .append("path")
      .datum(streakHistory)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // draw points
    svg
      .selectAll("circle")
      .data(streakHistory)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.finishedTodos))
      .attr("r", 4)
      .attr("fill", "steelblue");

    // draw X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    // draw Y axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    // draw title for X axis
    svg
      .append("text")
      .attr("x", (width - margin.left - margin.right) / 2 + margin.left) // center
      .attr("y", height - 5)
      .attr("text-anchor", "middle") // text in center
      .attr("font-size", "12px")
      .text("Dates");

    // draw title for Y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)") // rotate
      .attr("x", -(height - margin.top - margin.bottom) / 2 - margin.top) // center
      .attr("y", 15) // leave space for left
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text("Amount of Todos");
  }, [streakHistory]);

  return (
    <MenuCard title="History" isUsingCloseButton linkCloseButton="/dashboard">
      <InsideCardContainer>
        <LeftColumn>
          <LeftColumnWrapper>
            <InsideCard primary>
              <InsideCardContainerVertical>
                <InsideCardTitle>Best Streak</InsideCardTitle>
                <CardImage src={streakImg} alt="Streak" />
                <InsideCardText>{bestStreak}Days</InsideCardText>
              </InsideCardContainerVertical>
            </InsideCard>
            <InsideCard primary>
              <InsideCardContainerVertical>
                <InsideCardTitle>Current Streak</InsideCardTitle>
                <CardImage src={streakImg} alt="Streak" />
                <InsideCardText>{currentStreak}Days</InsideCardText>
              </InsideCardContainerVertical>
            </InsideCard>
          </LeftColumnWrapper>
        </LeftColumn>

        <RightColumn>
          <RightCardWrapper>
            <InsideCard large>
              <InsideCardTitle>Weekly Progress</InsideCardTitle>
              <svg
                ref={svgRef}
                style={{
                  height: "100%",
                  display: "block",
                }}
              ></svg>
            </InsideCard>
          </RightCardWrapper>
        </RightColumn>
      </InsideCardContainer>
    </MenuCard>
  );
};

export default DashboardHistoryView;

const InsideCardContainerVertical = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeftColumn = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const RightColumn = styled.div`
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100%;
  max-width: 100%;
`;

const RightCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CardImage = styled.img`
  width: 48px;
  height: 48px;
`;
