import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore) { }

  // add student
  addStudent(student: Student) {
    student.id = this.firestore.createId();
    return this.firestore.collection('/Students').add(student);
  }

  // get All Students
  getAllStudents() {
    return this.firestore.collection('/Students').snapshotChanges();
  }

  // delete student
  deleteStudent(student: Student) {
    return this.firestore.doc('/Students/' + student.id).delete();
  }

}
