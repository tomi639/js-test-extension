const CLIENT_ID = 'js-test-extension';
const CLIENT_VERSION = '1.0.0';
let SHELL_SDK = null;

updateUI = (text)=> {
    document.querySelectorAll('#info')[0].innerText = text;
}
//import ShellSDK  and events list ffrom FMSShell global variable
const { ShellSdk, SHELL_EVENTS } = FSMShell;

//display an error message if extension does not run within shell
if (!ShellSdk.isInsideShell()) {
    console.log('unable to reach shell eventAPI');
    updateUI('unable to reach shell eventAPI')
} else {
    // initialize ShellSDK to connect with parent shell library
    SHELL_SDK = ShellSdk.init(parent, '*');

    //init the extension by requesting the fsm context
    SHELL_SDK.emit(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, {
        clientIdentifier: CLIENT_ID, 
        auth: {
            response_type: 'token'
        }
    });

    SHELL_SDK.on(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, (context) => {
       const {
           account,
           accountId,
           company,
           companyId, 
           user,
           userId,
           selectedLocale,
       } = JSON.parse(context);
       updateUI(`USER: ${user} - ${account} - ${company}`);
       console.log(`USER: ${user} - ${account} - ${company}`);
       console.log(context);
    });


}