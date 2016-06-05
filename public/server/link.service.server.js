module.exports = function(app, mongoose) {

    //linkpair schema
    var LinkSchema = mongoose.Schema({
        oldAddr: String,
        newAddr: String
    }, {collection: "linkpair"});

    var LinkModel = mongoose.model("LinkModel", LinkSchema);

    //counter schema
    var CounterSchema = mongoose.Schema({
        name: String,
        seq: Number
    }, {collection: "counter"});

    var CounterModel = mongoose.model("CounterModel", CounterSchema);


    //restful apis
    app.post("/api/link", geneLink);
    app.get("/:addr", redirectLink);


    function geneLink(req, res) {
        var oldAddr = req.body.oldAddr;

        //check if address pair already exists
        LinkModel.findOne({oldAddr: oldAddr}, function (err, doc) {

            //address pair exists; retrieves new link
            if(doc) {
                console.log("address exists");
                res.json(doc.newAddr);
            }
            //address pair does not exist; saves link pair
            else {
                console.log("address doesn't exist");

                //get counter
                CounterModel.findOneAndUpdate({name: "pairLink"}, {$inc: {seq: 1}},{new: true},
                    function(err, doc) {

                        var path;
                        if(doc) {
                            path = geneNewLink(doc.seq);

                        } else {
                            CounterModel.create({name: "pairLink", seq: 0});
                            path = "0000a";
                        }

                        var newAddr = "http://shortlink-albertyy.rhcloud.com/" + path;

                        var newPair = {
                            oldAddr: oldAddr,
                            newAddr: newAddr
                        };

                        LinkModel.create(newPair, function (err, doc) {
                            if(doc) {
                                res.json(doc.newAddr);
                            }
                        });

                    }
                );


            }
        });
    }

    //generate new link
    function geneNewLink(counter) {
        var map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var res = "";
        while(counter != 0) {
            res = map.charAt(counter % 62) + res;
            counter = Math.floor(counter / 62);
        }

        var diff = 5 - res.length;
        for(var i = 0; i < diff; i++) {
            res = "0" + res;
        }

        return res;
    }



    function redirectLink(req, res) {

        var rediAddr = "http://shortlink-albertyy.rhcloud.com/" + req.params.addr;

        LinkModel.findOne({newAddr: rediAddr}, function (err, doc) {
            if(doc) {
                return res.redirect(301,doc.oldAddr);
            }
        });

    }

};