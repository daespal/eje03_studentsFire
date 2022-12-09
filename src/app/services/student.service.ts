import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Student } from "../models/student";
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor(private firestore: AngularFirestore) {
    this.students = [
      {
        controlnumber: "02400391",
        age: 38,
        career: "ISC",
        curp: "AOVI840917HNTRZS09",
        email: "iarjona@ittepic.edu.mx",
        name: "Israel Arjona Vizcaíno",
        nip: 717,
        photo: 'https://picsum.photos/600/?random=1'
      }, 
      {
        controlnumber: "12400391",
        age: 28,
        career: "IM",
        curp: "AOCI840917HNTRZS09",
        email: "iarjona2@ittepic.edu.mx",
        name: "Israel Arjona Castañeda",
        nip: 818,
        photo: 'https://picsum.photos/600/?random=2'
      },
      {
        controlnumber: "22400391",
        age: 18,
        career: "IC",
        curp: "OOCI840917HNTRZS09",
        email: "iarjona3@ittepic.edu.mx",
        name: "Israel Arjona Méndez",
        nip: 919,
        photo: 'https://picsum.photos/600/?random=3'
      }
    ];
  }

  public getStudents(){
    return this.firestore.collection('Students').snapshotChanges().pipe(
    map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Student;
        const id= a.payload.doc.id;
        return {id, ...data};
      })
    })
    );
    //return this.students;

  }

  public removeStudent(id: string){
    //this.students.splice(pos, 1);
    //return this.students;
    this.firestore.collection('Students').doc(id).delete();

  }

  public getStudentByControlNumber(controlnumber: string): Student {
    let item: Student = this.students.find((student)=> {
      return student.controlnumber===controlnumber;
    });
    return item;
  }

  public editStudent(student:Student,id:string){
    this.firestore.collection('Students').doc(id).update(student);
  }

  public newStudent(student: Student) {
    //this.students.push(student);
    //return this.students;
    this.firestore.collection('Students').add(student);
  }

  public getStudentById(id:string){
    let result = this.firestore.collection('Students').doc(id).valueChanges();
    return result;
  }
}
