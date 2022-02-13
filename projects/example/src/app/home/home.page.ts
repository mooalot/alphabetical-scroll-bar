import { Component } from '@angular/core';
import { names } from '../names';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

//for that extra flare
const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isScrollDisabled = false; //used to enable and disable scroll while using the scroll bar
  letterGroups: Array<string> = []; //each letter that will show up in a divider. Used for validLetters
  groups: Array<any> = []; //{ names: Array<string>, letterGroup: string }

  constructor() {
    this.groupByName(names);
  }

  //used in the html file to set a unique id for each group
  getGroupId(letter: string) {
    return `alphabet-scroll-${letter}`;
  }

  //called upon each emitted letter change
  goToLetterGroup(letter: string) {
    this.isScrollDisabled = true;
    let elementId = `alphabet-scroll-${letter}`;
    let element = document.getElementById(elementId);
    element.scrollIntoView();
    // hapticsImpactLight();
  }

  //Disables the scroll while user is using the scroll bar
  enableScroll() {
    this.isScrollDisabled = false;
  }

  //creates groups by first letter of name
  groupByName(names: Array<string>) {
    this.letterGroups = [];
    let sortedNames = names.sort((a, b) => a.localeCompare(b));
    let currentLetter = undefined;
    let currentNames = [];

    sortedNames.forEach((name) => {
      let firstLetter = name.charAt(0);
      if (firstLetter != currentLetter) {
        currentLetter = firstLetter;
        this.letterGroups.push(currentLetter);

        let newGroup = {
          letterGroup: currentLetter,
          names: [],
        };

        currentNames = newGroup.names;
        this.groups.push(newGroup);
      }

      currentNames.push(name);
    });
  }
}
