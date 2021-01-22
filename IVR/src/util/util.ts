export const addMessage = (name: string, message: string) => {

    // var customersRef = db.ref(`messages/${storeId}/${customerPhoneNumber}`);

    // customersRef.push({
    //     name,
    //     senderName: name,
    //     message,
    //     timestamp: admin.database.ServerValue.TIMESTAMP,
    //     avatar: "http://gravatar.com/avatar/15ef5bd18c36ed4a2b8e582022117d97?d=identicon",
    //     id: storeId
    // });
}

export const toTitleCase = (phrase: string) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const convert24hrTo12hr = (hour: number) => {
    if (hour >= 12) {
        return hour - 12 + "pm";
    } else {
        return hour + "am";
    }
};