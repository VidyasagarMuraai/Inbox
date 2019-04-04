import { Component, OnInit ,ViewChild} from '@angular/core';
import {SOAPHandlerService} from '../cordysServices/soap-handler.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
//import { map } from 'rxjs/operators';
import { Chart } from 'angular-highcharts';
declare var $:any;
export interface PeriodicElement {
  ProcessName: any;
  Sender: string;
  Priority: any;
}
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  chart: Chart;
  chart1:Chart;
  displayedColumns: string[] = ['ProcessName', 'Sender', 'Priority'];
  dataSource;
  tupleNodes;
  assignTaskLength:Number;
  completeTaskLength;
  assignedTasksDataSource;
  completedTasksDataSource;
  normalPriortyLength;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  
 // @ViewChild(MatSort) sort: MatSort;
  constructor(private soapService:SOAPHandlerService) { }

  ngOnInit() {
    this.assignTask();
   
  }
  public assignTask(){
    let username=localStorage.getItem("username")
    let obj={
      orderBy:"Task.DeliveryDate desc",
      Target:username
    }
    this.soapService.getAssignedTasks(obj).subscribe(
      (response:any) =>{
         this.tupleNodes = $.cordys.json.findObjects(response, 'Task');
        // this.dataSource=new MatTableDataSource(tupleNodes);
        this.assignedTasksDataSource = new MatTableDataSource(this.getAssignedTask(this.tupleNodes));
        this.completedTasksDataSource = new MatTableDataSource(this.getCompletedTask(this.tupleNodes));
        this.assignedTasksDataSource.paginator = this.paginator;
        this.completedTasksDataSource.paginator = this.paginator;
        this.chartsView();
        this.meterChart()
        console.log(this.tupleNodes); 
        
      },
      (err)=>{
        console.log(err);
        alert("Successfully inserted"); 
      }
    )
  }
 

  getCompletedTask(tasks: any[]): any[] {
    let completedTasks = [];
    let normalPriorty=[];
    let n
    if (tasks && tasks.length > 0) {
      completedTasks = tasks.filter((task) => task.State === 'COMPLETED')
      this.completeTaskLength=completedTasks.length;
    }
    if (tasks && tasks.length > 0) {
      normalPriorty = tasks.filter((task) => task.Priority === '3')
      this.normalPriortyLength=normalPriorty.length;
    }
  
    return completedTasks;
  }

  getAssignedTask(tasks: any[]): any[] {
    let assignedTasks = [];
    if (tasks && tasks.length > 0) {
      assignedTasks = tasks.filter((task) => task.State === 'ASSIGNED')
      this.assignTaskLength=assignedTasks.length;
    }
    return assignedTasks;
  }

  

  public chartsView(){
    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Tasks States'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
               
            }
        }
    },
    
      series: [<Highcharts.SeriesColumnOptions>{
        name: 'Number',
        colorByPoint: true,
        data: [{
            name: 'Assigned Tasks',
            y: this.assignTaskLength,
            sliced: true,
            selected: true
        }, {
            name: 'Unassigned Tasks',
            y: 12
        }, {
            name: 'Completed Tasks',
            y: this.completeTaskLength
        },  {
            name: 'Other',
            y: 1
        }]
    }]
    });
    //chart.addPoint(4);
    this.chart = chart;
   // chart.addPoint(5);
   
  }
  public meterChart(){
    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text:  'Task Priority'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%',
            showInLegend: true
        }
    },
    
    series: [{
      type: 'pie',
      name: 'Level of Tasks',
      innerSize: '50%',
      data: [
          ['High', 58],
          ['Normal', 13],
          ['Low', 13],
        
         
      ]
  }]
  
    });
    //chart.addPoint(4);
    this.chart1 = chart;
   // chart.addPoint(5);

  }
  public getTaskID(event){
    window.open("http://192.168.0.150:81/home/RandstadNew/cas/vcm/casrepository/applicationservices/connectors/xforms.htm?TaskId="+event.TaskId, "_blank");

  }
  public contentServer(){
    this.soapService.getAuthenticateToken().subscribe(
      (Response:any)=>{
        console.log(Response.AuthenticateUserResult.text);

        this.soapService.createFolder(Response.AuthenticateUserResult.text).subscribe(
        (response:any)=>{
          console.log(response);
        }
        )
      }
    )
  }

}
