import React, {Component} from 'react';
import './App.css';
import tanker from './services/TankerService';
import {TimeSeries} from 'pondjs';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Resizable
} from "react-timeseries-charts";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    let msPerDay = 86400000;
    let d = new Date();
    let now = d.getTime();
    let yesterday = now - 5 * msPerDay;

    let data = tanker.getLevels(yesterday, now);
    data.then((levels) => {
      console.log(levels);
      let levelsArr = Array.from(levels.Items);
      let graphData = {
        name: "tanker",
        columns: ["time", "level"],
        points: []
      };
      console.log(levelsArr);
      levelsArr.forEach((p) => {
        let point = [p.timestamp, p.level];
        graphData.points.push(point);
      });
      console.log(graphData);
      const timeSeries = new TimeSeries(graphData);
      console.log(timeSeries.count());
      const timeRange = timeSeries.timerange();
      this.setState({
        timeSeries: timeSeries,
        timeRange: timeRange
      });
    });
  }

  render() {

    return (
        <div className="App">
          <div className="App-intro">
            <p>
              Tank data for {this.state.timeRange
                ? this.state.timeRange.begin().toString() : "unknown"}
              {" to "}
              {this.state.timeRange
                  ? this.state.timeRange.end().toString() : "unknown"}.
            </p>
          </div>
          <div>
            {
              this.state.timeRange
                  ? <Resizable>
                    <ChartContainer timeRange={this.state.timeRange}>
                      <ChartRow height="150">
                        <YAxis
                            id="levelAxis"
                            min={0.0}
                            max={this.state.timeSeries.max("level")}/>
                        <Charts>
                          <LineChart
                              axis="levelAxis"
                              series={this.state.timeSeries}
                              columns={["level"]}/>
                        </Charts>
                      </ChartRow>
                    </ChartContainer>
                  </Resizable>
                  : <div>
                    No data
                  </div>
            }
          </div>
        </div>
    );
  }
}

export default App;