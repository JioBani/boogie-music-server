import { TopChartElementDto } from "./top-chart.element.dto";

export class TopChartDto{
    topChart : TopChartElementDto[];

    constructor(topChart : TopChartElementDto[]){
        this.topChart = topChart;
    }
}