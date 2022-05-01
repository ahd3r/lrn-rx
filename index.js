const rx = require('rxjs'); // Function that create a stream
const rxOp = require('rxjs/operators'); // Function that operates with the streams
const rxFetch = require('rxjs/fetch');
const { default: axios } = require('axios');
const EventEmitter = require('events');



// rx.range(1,10).pipe(
//   rxOp.concatMap(item => rx.of(item).pipe(
//     rxOp.delay(1000)
//   ))
// ).subscribe(v => {
//   console.log(v);
// });



// const badWords = ['shit', 'fuck', 'stupid', 'fucking'];
// const subj = new rx.Subject();

// const politeSub = subj.pipe(
//   rxOp.map(v => {
//     if(typeof v === 'string') {
//       const parsedMsg = v.split(' ').map(word => {
//         if(badWords.includes(word.replace(/[^a-zA-Z]/g, '').toLowerCase())){
//           return word.replace(/[a-zA-Z]/g, '*');
//         }
//         return word;
//       });
//       return parsedMsg.join(' ');
//     }
//     return v;
//   })
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   },
//   error: (e) => {
//     console.log(`error: ${e}`);
//   },
//   complete: () => {
//     console.log('Completed');
//   }
// });

// const rudeSub = subj.subscribe({
//   next: (v) => {
//     console.log(v);
//   },
//   error: (e) => {
//     console.log(`error: ${e}`);
//   },
//   complete: () => {
//     console.log('Completed');
//   }
// });

// subj.next('Hi, Shit!');
// subj.complete(); // ends all subscription for observable object



// const obs = new rx.Observable((subscriber) => { // async function works bad
//   const shittyInterval = setInterval(() => { // just for test teardown
//     subscriber.next('msg from shitty');
//   }, 500);

//   subscriber.next('Hi, fucking pice of shit)))!');

//   axios.get('https://api.chucknorris.io/jokes/random').then(({data}) => {
//     if (data.value.length > 100) {
//       subscriber.error('Too long joke...');
//     }
//     subscriber.next(data.value)
//     subscriber.next('And now buy');
//     subscriber.complete();
//   });

//   return () => { // call in the complete or error event
//     console.log('teardown');
//     clearInterval(shittyInterval);
//   }
// });

// obs.pipe(
//   rxOp.map(v => {
//     if(typeof v === 'string') {
//       const parsedMsg = v.split(' ').map(word => {
//         if(badWords.includes(word.replace(/[^a-zA-Z]/g, '').toLowerCase())){
//           return word.replace(/[a-zA-Z]/g, '*');
//         }
//         return word;
//       });
//       return parsedMsg.join(' ');
//     }
//     return v;
//   }),
//   rxOp.catchError((error) => {
//     return rx.throwError(() => error)
//   })
// ).subscribe({ // subscribe function execute a subscriber function in Observable immediately and wait its end, so it execute in sync way, NOT in async
//   next: (v) => {
//     console.log(v);
//   },
//   error: (e) => {
//     console.log(`error: ${e}`);
//   },
//   complete: () => {
//     console.log('Completed');
//   }
// });

// obs.pipe(
//   rxOp.catchError((error) => {
//     return rx.throwError(() => error)
//   })
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   },
//   error: (e) => {
//     console.log(`error: ${e}`);
//   },
//   complete: () => {
//     console.log('Completed');
//   }
// });



// const obs = new rx.Observable();

// const sub = obs.subscribe({
//   next: async (v) => {
//     console.log(v);
//   },
//   error: (e) => {
//     console.log('error: ' + e);
//   },
//   complete: () => {
//     console.log('This is the end');
//   }
// });

// sub.next('Emit next outside of the observable');
// sub.next('Emit next second time outside of the observable');



// rx.interval(10000).subscribe({
//   next: async (count) => {
//     const { data } = await axios.get('http://localhost:3000/joke');
//     console.log(`${count}: ${data.data}\n`);
//   },
//   error: (e) => {
//     console.log('Error: ' + e);
//   },
//   complete: () => {
//     console.log('Running...');
//   }
// });



// const obs = new rx.Observable();

// const sub = obs.subscribe({
//   next: async (v) => {
//     console.log(v);
//   },
//   error: (e) => {
//     console.log('error: ' + e);
//   },
//   complete: () => {
//     console.log('This is the end');
//   }
// });

// (() => {
//   const func = async () => {
//     const {data} = await axios.get('https://api.chucknorris.io/jokes/random');
//     if(data.value.length > 100) {
//       sub.unsubscribe();
//     } else {
//       console.log(data.value);
//       func();
//     }
//   };
//   func();
// })();



/**
 * When you use callback in new Observable constructor you call this function for every subscriber
 * Of course you can use new message emits outside, but the first one going to be executed exact from callback
 * With this approach you have to remember to define a teardown callback, to clean up all possible memory usage
 * Actually it is better to avoid callback in Observable constructor and emits message for each subscriber independently
 * Outside of the Observable, it is easier to control
 */



/**
 * Hot Observable is the Observable that emit an event no matter subscribe we to them or not, and once someone subscribe to it, it get the same event that other subscribers does
 * Cold Observable is the Observable that emit an event only for subscribers, each subscriber get its own data, not a general one
 */



// const myEmitter = new EventEmitter();
// rx.fromEvent(myEmitter, 'bla-bla-bla').subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });
// myEmitter.emit('bla-bla-bla', 1, 2, 3);
// myEmitter.emit('bla-bla-bla', 4, 5);
// myEmitter.emit('bla-bla-bla', 6);



// const subOne = new rx.Subject();
// const subTwo = new rx.Subject();
// const subDelay = new rx.Subject();

// rx.forkJoin([subOne, subTwo, subDelay]).subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });

// subOne.next('1');
// subOne.next('2');
// subTwo.next('3');
// subTwo.next('4');
// subOne.complete();
// subTwo.complete();
// setTimeout(() => {
//   subDelay.next('5');
//   subDelay.complete();
// }, 1000);



/**
 * In RxJs exist operators that react to an event from the source subscription by creating a stream under the hood and subscribe to it, and pass an event to the source stream
 * Every of those operators has pretty the same logic, but the difference in concurrency
 * concatMap - handle event consistently, one by one, waiting the complete of the previous, something like queue
 * switchMap - handle event immediately, by unsubscribing from previous and handling current
 * mergeMap - concurrently handles events, by creating a new inner stream under the source one
 */

// const subject = new rx.Subject();

// subject.pipe(
//   rxOp.concatMap((v, i) => {
//     if(i===0){
//       return rx.of(v);
//     }
//     return rx.of(v).pipe(rxOp.delay(1000));
//   })
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });

// subject.next(123);
// subject.next(321);

// // setInterval(() => {
// //   subject.next(1);
// // }, 1);



// const o = new rx.Observable((subscriber) => {
//   subscriber.next(321);
// });

// const sub = o.pipe(
//   rxOp.concatMap((v) => {
//     console.log('value inside the concatMap', v);
//     return rx.of(1,2);
//   })
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });

// sub.next(123);



// const subject = new rx.Subject();

// subject.pipe(
//   rxOp.switchMap((v, i) => {
//     if(i===0){
//       return rx.of(v);
//     }
//     return rx.of(v).pipe(rxOp.delay(1000));
//   })
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });

// subject.next(1);
// subject.next(2);
// subject.next(3);



// const subject = new rx.Subject();

// subject.pipe(
//   rxOp.mergeMap((v, i) => {
//     if(i===0){
//       return rx.of(v);
//     }
//     return rx.of(v).pipe(rxOp.delay(1000));
//   })
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });

// subject.next(1);
// subject.next(2);
// subject.next(3);



// const bSub = new rx.BehaviorSubject('0:0');

// bSub.pipe(
//   rxOp.map((v, i) => i === 0 ? `Now subs0 know the score, it is: ${v}` : v),
//   rxOp.filter((v) => v.length > 5)
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });

// bSub.next('1:0');

// bSub.pipe(
//   rxOp.map((v, i) => i === 0 ? `Now subs1 know the score, it is: ${v}` : v),
//   rxOp.filter((v) => v.length > 5)
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });

// bSub.pipe(
//   rxOp.map((v, i) => i === 0 ? `Now subs2 know the score, it is: ${v}` : v),
//   rxOp.filter((v) => v.length > 5)
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });

// bSub.next('1:1');

// bSub.pipe(
//   rxOp.map((v, i) => i === 0 ? `Now subs3 know the score, it is: ${v}` : v),
//   rxOp.filter((v) => v.length > 5)
// ).subscribe({
//   next: (v) => {
//     console.log(v);
//   }
// });
