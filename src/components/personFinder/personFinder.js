import UserList from '../../components/userList/userList';

export default () => {
    // initlialise a Class UserList, which holds a List of Persons
    const userList = new UserList();

    // set Eventlistener to Inputfield
    document.querySelector('#personFinder').addEventListener('finderChange', (data) => {
        // after each Selection from Input, the text is cleared
        // eslint-disable-next-line no-param-reassign
        data.srcElement.value = '';

        // Add the selected user to the UserList
        userList.addUser(data.user);
    });
};
