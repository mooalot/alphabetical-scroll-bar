import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'alphabetical-scroll-bar',
  template: `
    <div (touchmove)="updateTouch($event)"
    (touchstart)="updateTouch($event)" (touchend)="end()" class="alphabet-container">
      <div [class.touched]=" letterMagnification && alphabet[letterNumber - 1] === alphabet[i] && isTouched"
        [class.touched-neighbor]="checkIfNeighbor(alphabet[i])" class="letter-container" id="{{alphabet[i]}}"
        *ngFor="let letter of customAlphabet;  let i = index">
        {{letter}}
      </div>
    </div>
  `,
  styles: [`
    .alphabet-container {
      height: 100%;
      width: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 10px;
      padding-left: 30px;
      font-size: 70%;
      z-index: 100;
    }

    .letter-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        z-index: -100;
    }

    .touched {
        font-size: 200%;
    }

    .touched-neighbor {
        font-size: 150%;
    }
    `
  ]
})
export class AlphabeticalScrollBarComponent implements OnInit {

  @Input()
  letterMagnification: boolean = true;

  @Input()
  exactX: boolean = false;

  @Input()
  customAlphabet: Array<string> = [];

  @Input()
  validLetters: Array<string>;

  @Output()
  letterChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  endTouch: EventEmitter<void> = new EventEmitter<void>();

  alphabet: Array<string> = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("")
  letterNumber: number = 1;
  isTouched: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.customAlphabet.length === 0 || this.customAlphabet.length !== this.alphabet.length) {
      this.customAlphabet = this.alphabet;
    }
  }

  //updates on every form of touch
  updateTouch(event: any) {
    this.isTouched = true;

    let aTop = event.srcElement.getBoundingClientRect().top;
    let aHeight = event.srcElement.clientHeight;
    let touchY = event.touches[0].clientY;
    let index = Math.ceil(((touchY - aTop) / aHeight) * this.alphabet.length)


    let aRightX = event.target.parentElement.getBoundingClientRect().right
    let aLeftX = event.target.parentElement.getBoundingClientRect().left
    let touchX = event.touches[0].clientX;

    if (index <= this.alphabet.length && index > 0) {

      if (this.exactX) {
        if (touchX < aRightX && touchX > aLeftX) {
          this.onLetterNumberChange(Math.ceil(index))
        }
      }
      else {
        this.onLetterNumberChange(Math.ceil(index))
      }
    }
  }

  end() {
    this.endTouch.emit();
    this.isTouched = false;
  }

  //emits the letter change
  private onLetterNumberChange(value: number) {
    if (this.letterNumber !== value) {
      this.letterNumber = value;
      if (this.validLetters !== undefined)
        this.letterChange.emit(this.getClosestValidLetter(this.letterNumber));
      else
        this.letterChange.emit(this.alphabet[this.letterNumber - 1])

    }
  }

  //gets closest letter
  private getClosestValidLetter(letterNumber: number) {
    let targetLetter = this.alphabet[letterNumber - 1];

    let closest = this.validLetters.reduce(function (prev, curr) {
      return (Math.abs(curr.charCodeAt(0) - targetLetter.charCodeAt(0)) < Math.abs(prev.charCodeAt(0)
        - targetLetter.charCodeAt(0)) ? curr : prev);
    });

    return closest[0]
  }

  //checks if neighboer
  checkIfNeighbor(letter: string) {
    if (this.letterMagnification) {
      let lowerLetter: string = undefined;
      let upperLetter: string = undefined;
      if (this.letterNumber > 1)
        lowerLetter = this.alphabet[(this.letterNumber - 1) - 1]
      if (this.letterNumber < this.alphabet.length)
        upperLetter = this.alphabet[(this.letterNumber - 1) + 1]


      return (upperLetter === letter || lowerLetter === letter) && this.isTouched;
    }
    else return false;
  }

}
