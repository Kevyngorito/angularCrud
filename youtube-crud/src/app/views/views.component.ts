import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { elementAt } from 'rxjs';
import { ElementDialogComponent } from '../shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  doubleWeight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', doubleWeight: 0},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', doubleWeight:  0},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', doubleWeight: 0},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', doubleWeight: 0},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', doubleWeight: 0},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', doubleWeight: 0},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', doubleWeight: 0},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', doubleWeight: 0},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', doubleWeight: 0},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', doubleWeight: 0},
];
@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit{
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions', 'doubleWeight'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog){ }

  ngOnInit(): void {

  }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        name: '',
        weight: 'null',
        symbol:''
      } : {
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol:element.symbol
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if(this.dataSource.map(p => p.position).includes(result.position)) {
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        } else {
        this.dataSource.push(result);
        this.table.renderRows();
      }
    }
    });
  }

  editElement(element: PeriodicElement) : void {
    this.openDialog(element);
  }

 
doubleWeight (element: PeriodicElement) : any {
 element.weight * 2;
}
 

  deleteElement(position: number) : void {
    this.dataSource = this.dataSource.filter(p => p.position !== position);
  }
}
