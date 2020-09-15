/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled, supersetTheme } from '@superset-ui/core';
import { SPLITTER } from './plugin/transformProps';

interface TablePivotNewStylesProps {
  height: number;
  width: number;
}

export type TablePivotNewProps = {
  height: number;
  width: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<any, any>; // please add additional typing for your data here
};

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<TablePivotNewStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  overflow: scroll;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 20px;
  border: 1px solid black;
  grid-column: ${({ gridColumn }) => gridColumn || 'auto'};
  grid-auto-flow: ${({ gridAutoFlow }) => gridAutoFlow || 'row'};
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns || 'auto'};
  grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows || 'auto'};
`;

const GridItem = styled.div`
  min-height: 20px;
  border: 1px solid black;
  grid-column: ${({ gridColumn }) => gridColumn || 'auto'};
  grid-row: ${({ gridRow }) => gridRow || 'auto'};
`;

const Item = styled.div`
  min-height: 20px;
  border: 1px solid black;
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function TablePivotNew(props: TablePivotNewProps) {
  const {
    data,
    rowUnits,
    columns,
    rows,
    numberOfRows,
    metrics,
    width,
    height,
    columnValues,
    rowValues,
    numberOfColumns,
    columnUnits,
  } = props;

  // const result = [];
  // rows.forEach(row => {
  //   metrics.forEach(metric => {
  //     columns.forEach(column => {
  //       result.push(
  //         <Item>
  //           {data[`${column}${row}`] && data[`${columnValue}${rowValue}`][metric]}
  //         </Item>,
  //       );
  //     });
  //   });
  // });

  const resultRows = [];
  const getRow = (rowUnit, i, span) => {
    rowUnit.forEach(item => {
      resultRows.push(
        <GridItem gridRow={`span ${numberOfRows / (span * rowUnits[rows[i]].length)}`}>
          <Item>{item}</Item>
        </GridItem>,
      );
      rowUnits[rows[i + 1]] && getRow(rowUnits[rows[i + 1]], i + 1, span * rowUnits[rows[i]].length);
    }
  };

  getRow(rowUnits[rows[0]], 0, 1);


  return (
    <Styles height={height} width={width}>
      <Grid gridTemplateColumns={`auto auto`} gridTemplateRows={`auto auto`}>
        <Grid gridTemplateColumns={`repeat(${Object.keys(rowUnits).length}, auto)`}>
          <GridItem
            gridColumn={`span ${Object.keys(rowUnits).length}`}
            style={{ height: 21 * (Object.keys(columnUnits).length + 1) }}
          />
          {resultRows}
        </Grid>
        <div>
          <Grid gridTemplateColumns={`repeat(${numberOfColumns}, auto)`}>
            {metrics.map(metric => (
              <GridItem key={metric} gridColumn={`span ${numberOfColumns / metrics.length}`}>
                <div>{metric}</div>
              </GridItem>
            ))}
            {columns.map(column => {
              return columnUnits[column].map(item => (
                <GridItem
                  key={item}
                  gridColumn={`span ${numberOfColumns / columnUnits[column].length}`}
                >
                  <div>{item}</div>
                </GridItem>
              ));
            })}
            {data.map(item => <Item>{item}</Item>)}
          </Grid>
        </div>
      </Grid>
    </Styles>
  );
}
