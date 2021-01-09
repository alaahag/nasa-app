class utils {
    static API_PATH = '/api';
    static SnackBarProps = {
        SeverityType: {
            ERROR: 'error',
            WARNING: 'warning',
            INFO: 'info',
            SUCCESS: 'success'
        },
        MessageType: {
            SUCCESS_SAVED: 'Selected data has been saved successfully!',
            SUCCESS_REMOVED: 'Selected data has been removed successfully!',
            FAILED_SAVING: 'Failed saving data!',
            FAILED_DELETING: 'Failed deleting data!',
            CONNECTION_ERROR: 'Failed connecting to the remote server!'
        }
    };
};

module.exports = utils;