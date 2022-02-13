# Alphabetical Scroll Bar

This [Github](https://github.com/mooalot/alphabetical-scroll-bar) project contains the source code for the `alphabetical-scroll-bar` and an example of how it is used in an ionic project (`projects/example`). Here are the basics of how it works, but I strongly suggest looking through the example for how to use it.

|                                                     Inactive Scroll Bar                                                     |                                                     Active Scroll Bar                                                      |
| :-------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/mooalot/alphabetical-scroll-bar/blob/main/projects/example/src/assets/image2.PNG" width="300"> | <img src="https://github.com/mooalot/alphabetical-scroll-bar/blob/main/projects/example/src/assets/image.PNG" width="300"> |

## Version 2.0.0 and up

New features:

- You can now use your own custom alphabet.
- Added support for desktop (see usage for more info).
- Scroll bar now supports all screen sizes by adding dividers between the letters as the screen size gets smaller.

## Support

| Platform | Support |
| -------- | ------- |
| iOS      | Yes     |
| Android  | Yes     |
| Web      | Yes     |

## Usage

Install using npm

```
npm i alphabetical-scroll-bar
```

If you have issues installing, use --force or --legacy-peer-deps to install the peer dependencies

Import in your desired `module.ts`

```
import { AlphabeticalScrollBarModule } from 'alphabetical-scroll-bar';

@NgModule({
  imports: [
    ...
    AlphabeticalScrollBarModule
  ],
  ...
})
```

Here is the template for how data is passed to and from the component:

```
<app-alphabetical-scroll-bar
    [letterMagnification]="Boolean"
    [exactX]="Boolean"
    [customAlphabet]="Array<string>"
    [validLetters]="Array<string>"
    [navigateOnHover]="Boolean"
    (letterChange)="EventEmitter<string>"
    (endTouch)="EventEmitter<void>">
<app-alphabetical-scroll-bar>
```

**letterMagnification** defaults to `true`. This feature will create a magnification effect on the alphabetical scroll bar when the user touches it or hovers over it.

**exactX** defaults to `false`. When `false`, this means the user does not have to be accurate along the x direction of the screen (after they have touched the scroll bar), meaning they can slide their finger freely along the x axis while still changing the scroll value. If set to `true`, the user will have to remain inside the scroll bar to continue navigating (I think false gives it a smoother feel). (MOBILE ONLY)

**alphabet** allows you to enter your own custom version of the alphabet. It defaults to an all caps alphabet.

**validLetters** is an array of the possible letters that are available in the scrollable content. For example, if you only have 5 different letter dividers `A`, `D`, `F`, `I`, and `R`, you would want to pass these into `validLetters`. If you did not, when you tap on `Z` in the alphabetical scroll bar, nothing will happen. If you do include `validLetters`, your view would be taken to the next closest letter, which in this case is `R`. This is not a requirement, but it will make your alphabetical scroll bar much more robust.

**letterChange** is an eventEmitter. Every time the user scrolls through the alphabetical scroll bar to a new letter, this emitter will output the letter (as a `string`) that the user scrolled to. This will allow you to scroll to the appropriate letter divider. The example project above shows one method of how this function can be used. You can add things like haptics in the function this calls.

**endTouch** is an eventEmitter that will emit when the user releases their finger from the scroll bar. This is used to stop any unwanted scroll glitches while the user is using the alphabetical scroll bar. See example for more information. (MOBILE ONLY)

**navigateOnHover** defaults to `false`. This means that the user will have to tap on the scroll bar to navigate to a new letter. If set to `true`, the user will be able to navigate to a new letter by hovering over the scroll bar. (DESKTOP ONLY)

_You can see how all of these are used in the `projects/example` folder._

\*Also note that the `app-alphabetical-scroll` element must have a high z-index to be above dividers and other elements.
