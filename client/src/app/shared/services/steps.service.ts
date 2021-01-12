import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepModel } from '../models/step';

const STEPS = [
  { stepIndex: 1, isComplete: false },
  { stepIndex: 2, isComplete: false },
  { stepIndex: 3, isComplete: false },
  { stepIndex: 4, isComplete: false }
];

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  steps$: BehaviorSubject<StepModel[]> = new BehaviorSubject<StepModel[]>(STEPS);
  currentStep$: BehaviorSubject<StepModel> = new BehaviorSubject<StepModel>(null);

  constructor() {
    this.currentStep$.next(this.steps$.value[0]);
  }

  setCurrentStep(step: StepModel): void {
    this.currentStep$.next(step);
  }

  getCurrentStep(): Observable<StepModel> {
    return this.currentStep$.asObservable();
  }

  getSteps(): Observable<StepModel[]> {
    return this.steps$.asObservable();
  }

  moveToPreviusStep(): void {
    const index = this.currentStep$.value.stepIndex;

    console.log('index',index)
    // this.currentStep$.subscribe((data) => {
    //     console.log(' data.stepIndex', data.stepIndex)
    //     this.currentStep$.next(this.steps$.value[  data.stepIndex ]);
    //     // this.setCurrentStep(this.steps$.value[ data.stepIndex - 1]);
    // })
    // console.log('this.steps$.value[index - 1]',this.steps$.value[index - 1])
    // this.setCurrentStep(this.steps$.value[index - 1]);
    // console.log('index - 1',index - 1)
    // console.log('this.steps$.value',this.steps$.value[1])
    // console.log('this.steps$.value',this.steps$.value)
    // console.log('this.steps$.value[index - 1]',this.steps$.value[index - 1])
    this.currentStep$.next(this.steps$.value[ index - 1 ]);
    // console.log('this.currentStep$.value.stepIndex',this.currentStep$.value.stepIndex)
    // this.currentStep$.next(this.steps$.value[index - 1]);
    // if (index !== 0) {
    //   this.currentStep$.next(this.steps$.value[index - 1]);
    // }
  }

  moveToNextStep(): void {
      console.log(this.currentStep$.value.stepIndex);
    const index = this.currentStep$.value.stepIndex;

    if (index < this.steps$.value.length) {
      this.currentStep$.next(this.steps$.value[index]);
    }
  }

  isFirstStep(): boolean {
    return this.currentStep$.value.stepIndex === 0;
  }

  isLastStep(): boolean {
    return this.currentStep$.value.stepIndex === this.steps$.value.length;
  }
}