// import { getUserNames, foo, bar } from "./utils";
// import secret from './constants';

// const userNames = getUserNames([{ 'id': 1, 'name': 'MJ' }])
// console.log(userNames, secret, foo, bar);

// Timeout and interval
// setTimeout(() => {
//   console.log('#1');
// }, 1000);

// setInterval(() => {
//   console.log("#2");
// }, 1000)


// callback
// const getData = (callback) => {
//   setTimeout(() => {
//     console.log("Got data from API");
//     callback([{ 'id': 1, "name": 'MJ' }]);
//   });
// };

// console.log("#1");
// getData((data) => {
//   console.log('data from api call callback ', data);
// });
// console.log("#2");


// Promises and async await
// const getData = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Got data from API");
//       resolve([{ 'id': 1, "name": 'MJ' }]);
//     });
//   });
// };

// Prmoise
// const promise = getData();
// promise.then((data) => {
//   console.log("I got data", data);
// }).catch((data) => {
//   console.log('I have an error', data);
// }).finally(() => {
//   console.log('Finally');
// })

// async await
// const getData = async () => {
//   return [{ "id": 1, "name": 'MJ' }];
// }

// const response = await getData();
// console.log(response);

const getCurrentUser = async () => {
    return { "id": 1 };
}
const getCurrentUserDetails = async (id) => {
    throw new Error("Something went wrong");
    return { "name": "MJ" };
};

// promise approach
// getCurrentUser().then((currentUser) => {
//   getCurrentUserDetails(currentUser).then((details) => {
//     console.log(details);
//   });
// });

// async await approach
// const getFullUser = async () => {
//   try {
//     const currentUser = await getCurrentUser();
//     return await getCurrentUserDetails(currentUser.id);
//   } catch (error) {
//     console.log('Some error happned', error);
//   }
// };

// const details = await getFullUser();
// console.log(details);

// fetching data
// const loadPosts = async () => {
//   const response = await fetch('http://localhost:3004/posts');
//   const posts = await response.json();
//   return posts;
// };

// const result = await loadPosts();
// console.log(result);

// const createPost = async () => {
//   const response = await fetch('http://localhost:3004/posts', {
//     method: "POST",
//     body: JSON.stringify({ "title": "Hello JS" }),
//     headers: { 'Content-Type': 'application/json' }
//   });
//   const posts = await response.json();
//   return posts;
// };

// window.createPost = createPost;

// Post using form data
// const form = document.querySelector('.form');
// form.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const formData = form.querySelector('.data');
//   if (formData.value === '') {
//     return;
//   }
//   const response = await fetch('http://localhost:3004/posts', {
//     method: 'POST',
//     body: JSON.stringify({ "title": formData.value }),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
//   const result = await response.json();
//   console.log(result);
//   formData.value = '';
// });


// local storage
// const user = localStorage.getItem('foo');
// if (user == null) {
//   localStorage.setItem('foo', 'bar');
// }
// console.log(localStorage.getItem('foo'));

//Destructuring
// const user = {
//   name: "MJ",
//   age: 28
// };

// const { name, age } = user;
// console.log(name, age);

// const getFullName = ({ name, surname }) => {
//   return name + ' ' + surname;
// };
// const username = {
//   name: 'MJ',
//   surname: 'Tuttu'
// }
// console.log(getFullName(username));

// value assignment
// array and Object will assign reference, other value
// const user = { name: 'MJ' };
// const user1 = user;
// user.name = 'Tuttu';
// console.log(user, user1);

// const basicConfig = {
//   url: 'httpss://google.com',
//   foo: 'foo',
//   bar: 'bar',
//   port: 200
// };

// const getExtendedConfig = (config) => {
//   return { ...config, port: 300 };
// };

// const extendConfig = getExtendedConfig(basicConfig);
// console.log(extendConfig, basicConfig);

const users = ['jack'];
// const users2 = users; // copy reference
// users2.push('john');
const users2 = [..users, 'john']; // copy value
console.log(users, users2);