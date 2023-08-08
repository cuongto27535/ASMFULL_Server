var express = require('express');
var app = express();
const userUser = require('../model/usernd')
app.use(express.static(__dirname+"/images"))




app.post('/nguoidung', (req, res) => {
    console.log(req.body);
    if (req.body.id == '') {
        //them
       addnd(req, res);
    } else {
        //update
        updatend(req, res);
    }


});
async function addnd(req, res) {
    const n = new userUser(req.body) //Lấy thông tin nhập vào
    try {
        await n.save() //Thêm vào trong database
        userUser.find({}).then(user => {
            res.render('../views/danhsachnguoidung.hbs', {
                arrayuser: user.map(user => user.toJSON())
            })
        })

    } catch (error) {
        console.log(error)
    }
    
}

function updatend(req, res) {
    userUser.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }).then((err, doc) => {
        try {
            userUser.find({}).then(user => {
                res.render('../views/danhsachnguoidung.hbs', {
                    arrayuser: user.map(user => user.toJSON())
                })
            })
        } catch (error) {
            console.log(error)
        }
    })
}

app.get('/danhsachnguoidung', (req, res) => {
    userUser.find({}).then(user => {
        res.render('../views/danhsachnguoidung.hbs', {
            arrayuser: user.map(user => user.toJSON())
        })
    })


})


//edit
app.get('/edit/:id', (req, res) => {
    userUser.findById(req.params.id).then(user => {
        res.render('../views/dangki.hbs', {
            user: user.toJSON()
        })
    })
});

//delete
app.get('/delete/:id', async (req, res) => {
    try {
        const user = await userUser.findByIdAndDelete(req.params.id, req.body);
        if (!user) response.status(404).send("No item");
        else {

            res.redirect('/dsnguoidungs/danhsachnguoidung')
        }
        res.status(200).send();
    } catch (err) {
        res.status(500).send(error);

    }
});

module.exports = app
