import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { validateNewUser } from './users';

if (Meteor.isServer) {
    describe('Users', function () {
        it('should allow valid emails', function () {
            const testUser = {
                emails: [
                    {
                        address: 'test@test.com'
                    }
                ]
            }

            const res = validateNewUser(testUser);

            expect(res).toBe(true);
        });

        it ('should reject invalid emails', function () {
            const testUser = {
                emails: [
                    {
                        address: 'failtest.com'
                    }
                ]
            };

            expect(() => {
                validateNewUser(testUser);
            }).toThrow();
        });
    });
}

// const add = (a, b) => {
//     if (typeof b !== 'number') {
//         return a + a;
//     }
    
//     return a + b;
// };

// const square = (a) => a * a;

// describe('Add function', function () {

//     it('should add two numbers', function () {
//         const res = add(11, 9);

//         expect(res).toBe(20);

//         // if (res !== 20) { // Assertion without expect npm package
//         //     throw new Error('Sum was not equal to expected value');
//         // }
//     });

//     it('should double a single parameter', function () {
//         const res = add(11);

//         expect(res).toBe(22);
//         // if (res !== 22) { // Assertion without expect npm package
//         //     throw new Error('Was not doubled');
//         // }
//     });
// });

// describe('Square', function () {
//     it('should square a number', function () {
//         const res = square(3);

//         expect(res).toBe(9);
//         // if (res !== 9) { // Assertion without expect npm package
//         //     throw new Error('Was not squared');
//         // }
//     });
// });

// // Throw a new error to fail a test
// // it('should throw an error', function () {
// //     throw new Error('No good');
// // });