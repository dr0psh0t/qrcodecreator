/**
 *
 * this is the js script for the page addcontacts.jsp
 */

var qrForm = Ext.create('Ext.form.Panel', {

    region : 'center',
    title : 'QR Code Creator',
    titleAlign : 'center',

    defaults : {
        allowBlank : false
    },

    items : [
        {
            xtype : 'textfield',
            emptyText : 'Fullname',
            name : 'fullname',
            id : 'fullname',
            inputType : 'textfield',
            anchor : '100%',
            margin : '20',
            maskRe : /[A-Za-z\s+]/,
            enforceMaxLength : true,
            maxLength : 32
        },
        {
            xtype : 'textfield',
            emptyText : 'Company',
            name : 'company',
            id : 'company',
            inputType : 'textfield',
            anchor : '100%',
            margin : '20',
            enforceMaxLength : true,
            maxLength : 100,
            minLength : 3
        },
        {
            xtype : 'textfield',
            emptyText : 'Job Position',
            id : 'jobPosition',
            name : 'jobPosition',
            anchor : '100%',
            margin : '20',
            maskRe : /[A-Za-z0-9\s+]/,
            maxLength : 64,
            enforceMaxLength : true
        },
        {
            xtype : 'textareafield',
            grow : true,
            emptyText : 'Address',
            name : 'address',
            id : 'address',
            inputType : 'textareafield',
            anchor : '100%',
            margin : '20'
        },
        {
            xtype : 'textfield',
            inputType : 'number',
            emptyText : 'Cell',
            name : 'mobile',
            id : 'mobile',
            anchor : '100%',
            margin : '20',
            stripCharsRe: /[^0-9]/,
            maskRe: /[0-9]/,
            maxLength : 12,
            enforceMaxLength : true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            minValue : 0
        },
        {
            xtype : 'textfield',
            emptyText : 'Email',
            name : 'email',
            id : 'email',
            inputType : 'email',
            anchor : '100%',
            margin : '20',
            enforceMaxLength : true,
            maxLength : 32,
            vtype: 'email'
        },
        {
            xtype : 'textfield',
            emptyText : 'Website',
            name : 'website',
            id : 'website',
            anchor : '100%',
            margin : '20',
            enforceMaxLength : true,
            maxLength : 32
        },
        {
            disabled : true,
            xtype : 'button',
            margin : '20',
            anchor : '100%',
            text : 'Create',
            cls : 'x-button',
            formBind : true,

            handler : function() {

                var form = this.up('form');

                if (form.isValid())
                {
                    form.submit({

                        waitMsg: 'Saving new contact...',
                        method : 'post',
                        url : 'createqr',

                        success : function (form, action) {

                            var assoc = Ext.decode(action.response.responseText);
                            Ext.Msg.alert('Please read!', 'You qr code is saved to: '+assoc['link']);
                            form.reset();
                        },

                        failure : function (form, action) {

                            var assoc = Ext.decode(action.response.responseText);
                            Ext.Msg.alert('Error', assoc['reason']);
                        }
                    });
                }
            }
        }
    ]
});

var qrImage =

Ext.onReady(function() {
    Ext.QuickTips.init();

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        id: 'viewportContact',
        renderTo: Ext.getBody(),
        items: [qrForm]
    });
});

function displayPhoto(link)
{
    var img2 = new Image();

    img2.onload = function() {

        var resizedWidth = 300 + 0;
        var resizedHeight = 300 + 0;
        var imageHeight = 300;

        var picturePanel = Ext.create('Ext.panel.Panel', {

            region : 'center',
            id : 'picture',
            width : resizedWidth,
            height : resizedHeight,
        });

        Ext.create('Ext.Window', {

            id : 'pictureWindow',
            title : 'Photo',
            width : resizedWidth,
            height : resizedHeight,
            minWidth : resizedWidth,
            minHeight : resizedHeight,
            layout : 'fit',
            plain : true,
            modal : true,
            items : [picturePanel],

            buttons: [
                {
                    text : 'Close',
                    handler	: function() {
                        Ext.getCmp('pictureWindow').destroy();
                    }
                }
            ]
        }).show();

        var img = Ext.create('Ext.Img', {
            src : link,
            height : imageHeight,
            width : resizedWidth
        });

        picturePanel.add(img);
    }
    img2.src = link;
}