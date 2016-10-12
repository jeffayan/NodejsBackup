var Notify = window.Notify.default;

var myNotification = new Notify('Yo dawg!', {
    body: 'This is an awesome notification',
    notifyShow: onNotifyShow
});

function onNotifyShow() {
    console.log('notification was shown!');
}