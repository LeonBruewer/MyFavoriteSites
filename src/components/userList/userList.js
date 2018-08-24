import getUserElement from '../user/user';


export default class UserList {
    constructor() {
        // Each time you Call `new UserList()` an Array in initialised.
        // With the `this` in front the array is not bound to the function anymore, but to the whole Class. Because `this` referes to the Class
        this.users = [];
    }

    // function to remove a User from the users-array
    removeUser(removeId) {
        this.users = this.users.filter(person => person.userId !== removeId);
        this.render();
    }

    // function to add a User to the users-array
    addUser(user) {
        if (this.users.find(u => u.userId === user.userId)) {
            return;
        }
        this.users.push(user);
        this.render();
    }

    // function to show the actual Content
    render() {

        // locally save the array in a variable
        const users = this.users;


        // variable for the surrounding divs inside an Accordion
        const userListWrapper = document.querySelector('#usersList');


        userListWrapper.innerHTML = '';
        console.log(users.length, users);
        if (users.length > 0) {
            // Hide the Text and Show results
            document.querySelector('.accordion__content').style.display = 'none';
            document.querySelector('#usersList').style.display = 'block';

            // Add the Results to the userlist
            for (const user of users) {
                userListWrapper.appendChild(getUserElement(user, () => {
                    this.removeUser(user.userId);
                }));
            }
        } else {
            // If there are no Users selected the Text will be shown
            document.querySelector('.accordion__content').style.display = 'block';
            document.querySelector('#usersList').style.display = 'none';
        }
    }
}
