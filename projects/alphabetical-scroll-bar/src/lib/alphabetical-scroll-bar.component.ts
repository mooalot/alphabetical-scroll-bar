import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-alphabetical-scroll-bar',
  templateUrl: './alphabetical-scroll-bar.component.html',
  styleUrls: ['./alphabetical-scroll-bar.component.scss'],
})
export class AlphabeticalScrollBarComponent implements OnInit, OnDestroy {
  @ViewChild('alphabetContainer', { static: true })
  alphabetContainer: ElementRef;

  @Input()
  letterMagnification: boolean = false;

  @Input()
  exactX: boolean = false;

  @Input()
  alphabet: Array<string> = 'abcdefghijklmnopqrstuvwxyz'
    .toUpperCase()
    .split('');

  @Input()
  validLetters: Array<string> = undefined;

  @Input()
  navigateOnHover: boolean = false;

  @Output()
  letterChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  endTouch: EventEmitter<void> = new EventEmitter<void>();

  visibleLetters: Array<string> = [];
  letterIndex: number;
  active: boolean = false;

  hidden: number = 0;

  constructor() {}

  ngOnInit() {
    let interval = setInterval(() => {
      if (this.alphabetContainer.nativeElement.clientHeight > 0) {
        this.onResize();
        window.addEventListener('resize', this.onResize.bind(this));
        clearInterval(interval);
      }
    }, 100);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    let newAlphabet = this.alphabet;

    const letterSize = Number(
      window
        .getComputedStyle(document.body)
        .getPropertyValue('font-size')
        .match(/\d+/)[0]
    );
    const height = this.alphabetContainer.nativeElement.clientHeight;

    const newLetterIndex = Math.ceil((this.letterIndex * height) / letterSize);
    this.letterIndex = newLetterIndex;
    this.onLetterIndexChange(newLetterIndex);

    const numLetters = this.alphabet.length;
    if (height / letterSize < numLetters) {
      const numHiddenLetters = numLetters - Math.floor(height / letterSize);

      //determine how many letters to hide
      const hiddenHalves =
        this.getNumHiddenHalves(numHiddenLetters, numLetters) + 1;

      //split alphabet into two halves
      let alphabet1 = this.alphabet.slice(0, Math.ceil(numLetters / 2));
      let alphabet2 = this.alphabet.slice(Math.floor(numLetters / 2)).reverse();

      for (let i = 0; i < hiddenHalves; i++) {
        alphabet1 = alphabet1.filter((letter, index) => {
          return index % 2 === 0;
        });
        alphabet2 = alphabet2.filter((letter, index) => {
          return index % 2 === 0;
        });
      }

      //insert dots between letters
      alphabet1 = alphabet1.reduce((prev, curr, i) => {
        if (i > 0) {
          prev.push('·');
        }
        prev.push(curr);
        return prev;
      }, []);
      //insert dots between letters
      alphabet2 = alphabet2.reduce((prev, curr, i) => {
        if (i > 0) {
          prev.push('·');
        }
        prev.push(curr);
        return prev;
      }, []);

      if (this.alphabet.length % 2 === 0) alphabet1.push('·');

      newAlphabet = alphabet1.concat(alphabet2.reverse());
    }

    this.visibleLetters = newAlphabet;
  }

  getNumHiddenHalves(numHiddenLetters: number, total: number) {
    if (numHiddenLetters > total / 2) {
      return (
        1 +
        this.getNumHiddenHalves(
          numHiddenLetters % (total / 2),
          Math.ceil(total / 2)
        )
      );
    }
    return 0;
  }

  isActive(i: number) {
    return this.letterIndex === i + 1 && this.active;
  }

  isActiveNeighbor1(i: number) {
    return (
      (i + 1 === this.letterIndex - 1 || i + 1 === this.letterIndex + 1) &&
      this.active
    );
  }

  isActiveNeighbor2(i: number) {
    return (
      (i + 1 === this.letterIndex - 2 || i + 1 === this.letterIndex + 2) &&
      this.active
    );
  }

  isActiveNeighbor3(i: number) {
    return (
      (i + 1 === this.letterIndex - 3 || i + 1 === this.letterIndex + 3) &&
      this.active
    );
  }

  //*** Touch Events ***//
  touchStart(event: any) {
    this.active = true;
    this.touchMove(event);
  }

  //updates on every form of touch
  touchMove(event: any) {
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;

    const newLetterIndex = this.getLetterIndexFromCoordinates(x, y);

    if (newLetterIndex) this.onLetterIndexChange(newLetterIndex);
  }

  touchEnd() {
    this.endTouch.emit();
    this.active = false;
  }

  //*** End Touch Events ***//

  //*** Mouse Events ***//

  mouseEnter(event: any) {
    this.active = true;
    this.mouseMove(event);
  }

  mouseMove(event: any) {
    const x = event.clientX;
    const y = event.clientY;

    const newLetterIndex = this.getLetterIndexFromCoordinates(x, y);

    if (!this.navigateOnHover) return;

    if (newLetterIndex) this.onLetterIndexChange(newLetterIndex);
  }

  mouseLeave(event: any) {
    this.active = false;
  }

  click(event: any) {
    const x = event.clientX;
    const y = event.clientY;

    const newLetterIndex = this.getLetterIndexFromCoordinates(x, y);

    this.onLetterIndexChange(newLetterIndex);
  }

  //*** End Mouse Events ***//

  //*** Logic ***//

  private getLetterIndexFromCoordinates(x: number, y: number) {
    let letterIndex = null;
    const aTop =
      this.alphabetContainer.nativeElement.getBoundingClientRect().top;
    const aHeight = this.alphabetContainer.nativeElement.clientHeight;
    const index = Math.ceil(((y - aTop) / aHeight) * this.alphabet.length);
    const aRightX =
      this.alphabetContainer.nativeElement.getBoundingClientRect().right;
    const aLeftX =
      this.alphabetContainer.nativeElement.getBoundingClientRect().left;

    if (index <= this.alphabet.length && index > 0) {
      if (this.exactX) {
        if (x < aRightX && x > aLeftX) {
          letterIndex = Math.ceil(index);
        }
      } else {
        letterIndex = Math.ceil(index);
      }
    }
    this.letterIndex = Math.round(
      letterIndex * (this.visibleLetters.length / this.alphabet.length)
    );

    return letterIndex;
  }

  //emits the letter change
  private onLetterIndexChange(value: number) {
    if (!value) return;
    const letter = this.validLetters
      ? this.getClosestValidLetter(value)
      : this.alphabet[value - 1];
    this.letterChange.emit(letter);
  }

  //gets closest letter
  private getClosestValidLetter(letterIndex: number) {
    const lowercaseAlphabet = this.alphabet.map((letter) =>
      letter.toLowerCase()
    );
    const lowercaseValidLetters = this.validLetters.map((letter) =>
      letter.toLowerCase()
    );
    const validLettersAsNumbers = lowercaseValidLetters.map(
      (letter) => lowercaseAlphabet.indexOf(letter) + 1
    );

    const closest = validLettersAsNumbers.reduce((prev, curr) =>
      Math.abs(curr - letterIndex) < Math.abs(prev - letterIndex) ? curr : prev
    );
    return this.alphabet[closest - 1];
  }
}
