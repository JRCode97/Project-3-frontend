import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bug-report-view',
  templateUrl: './bug-report-view.component.html',
  styleUrls: ['./bug-report-view.component.css']
})
export class BugReportViewComponent implements OnInit {

  title = "Bug Subject";
  application = "Application Name";
  suspectedLocation = "bug suspected Location";
  severity = "Bug severity";
  priority = "Bug priority";
  reporter = "User name";
   date =    new Date().toLocaleString() ;
  description = `<!-- <div class="row">

  <div class="col-6">
      <table class="table">
          <thead>
              <th>
                  <b>Solution Title</b>
              </th>
              <th>
                  <b>Solution Describtion</b>
              </th>
              <th>
                  <b>Solver </b>
              </th>

          </thead>
          <tr>
              <td>
                  Solution 1 Title
              </td>
              <td>
                  Solution 1 Describtion
              </td>
              <td>
                  Developer 1
              </td>

          </tr>
      </table>
  </div>
</div> -->";`
  reproduceSteps = "Bug reproduce Steps";
  points = "Bug points";

  constructor() { }

  ngOnInit(): void {
  }

}
