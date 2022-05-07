var express = require('express');
var router = express.Router();
const passport = require('passport');


//models
var Review = require('../models/Review');
var Dao = require('../models/Dao');
var RateReview = require('../models/RateReview');


const FRONTEND = process.env.FRONTEND



const addReview = async (req, res) => {
    let data = req.query.data;
    data = JSON.parse(data);
    if (req.isAuthenticated()) {
        try {

            let guild_list = JSON.parse(req.user.guilds).map((ele) => {
                return ele.id;
            });

            let dao_name = data.dao_name;
            let guild_id = data.guild_id;

            if (guild_list.includes(data.guild_id)) {
                let review = new Review({ ...data, user_discord_id: req.user.dicordId });
                let db_res = await review.save();
                let count = await Review.count({ dao_name, guild_id });
                let dao = await Dao.findOne({ dao_name, guild_id });
                dao.review_count = count;
                console.log(dao)
                await dao.save();
                if (db_res) {
                    res.redirect(`${FRONTEND}/redirect/success`);
                }
                else {
                    res.redirect(`${FRONTEND}/redirect/failed`);
                }
            }
            else {
                res.send("Auth error");
            }
        }
        catch (er) {
            console.log(er);
            res.redirect(`${FRONTEND}/redirect/failed`);
        }
    }
    else {
        res.send("Auth error");
    }
}

let reviewSample = {
    "rating": `${((Math.floor(Math.random() * 3)) + 6)}`,
    "review_desc": "",
    "resonate_vibes_rate": `${((Math.floor(Math.random() * 50)) + 101)}`,
    "onboarding_exp": `${((Math.floor(Math.random() * 50)) + 101)}`,
    "opinions_matter": `${((Math.floor(Math.random() * 50)) + 101)}`,
    "great_org_structure": `${((Math.floor(Math.random() * 50)) + 101)}`,
    "friend_recommend": `${((Math.floor(Math.random() * 50)) + 101)}`,
    "great_incentives": `${((Math.floor(Math.random() * 50)) + 101)}`,
    "user_discord_id": `${((Math.floor(Math.random() * 10000)) + 90000)}`,
    "dao_name": "",
    "guild_id": "",
    "public_address": `${((Math.floor(Math.random() * 100000000000)) + 900000000000)}`
}

let para = [
    "Traditional businesses are usually organized hierarchically, with a single person or group dictating the organization’s mission and values for its members. Decentralized autonomous organizations — or DAOs — decentralize governance by instead entrusting authority with a participatory algorithm. ",
    "DAOs are ever-evolving and come in various forms, but they are usually collectively owned internet-native communities that run on blockchain technology. DAOs connect people with a shared economic or social mission, while automating processes like collective decision-making, pooling of resources and deployment of capital.",
    "“The future of corporations could be very different as DAOs take on legacy businesses,” according to a tweet by American billionaire entrepreneur Mark Cuban. “It’s the ultimate combination of capitalism and progressivism… If the community excels at governance, everyone shares in the upside.”",
    "A DAO isn’t governed by a single person, government or entity. Instead, the organization’s rules are encoded on blockchain technology — typically  Ethereum — and have to be voted upon by the DAO’s members. This gives all involved members complete transparency in both the organization’s structure and monetary decisions.",
    "What allows a DAO to function is a smart contract: a collection of code that runs on blockchain. The contract defines an organization’s rules and secures its treasury. Members cannot change or violate the rules, except by vote. The group makes decisions collectively and payments are authorized automatically when votes pass. This democratizes decision-making and makes operations fully transparent and global. ",
    "A DAO’s funding mainly comes from crowdfunding and token issuance. Interested members purchase tokens, and in return are given certain voting rights — for fund management and organizational operations — proportional to their holdings. Some DAOs give members access to an organization’s profits or losses, while other DAOs allow members to manage and transfer the resources controlled by the organization.",
    "Historically, humans and organizations have repeatedly attempted to coordinate economic and social interactions. With recent digital advancements in most fields, it’s unsurprising to see the emergence of a technological model governing organizational structure. ",
    "The idea of a DAO in its current form can be traced back to BitShares in 2014, which embodied the concept of a Decentralized Autonomous Corporation, or DAC. BitShares was a virtual e-commerce platform linking merchants and customers without a central authority.",
    "But it was only in 2016 that members of the Ethereum community announced the creation of the first DAO, called The DAO or Genesis DAO. This platform allowed people to pitch projects and potentially receive funding from The DAO. Members with DAO tokens were granted voting rights and would in turn reap rewards if chosen projects turned profits.",
    "Despite these challenges, 2019 saw a renewed interest in similar concepts and projects. Both the explosion of decentralized finance and MolochDAO’s creation of ERC-20 — a new smart contract design — as a technical standard spurred the emergence of several new DAOs. Examples include MakerDAO, an autonomous lending platform and Aragon, a multi-chain DAO deployment platform. ",
    "Because DAOs avoid written agreements and other legal formalities by relying on code, they are also raising governance and regulatory concerns. These challenges include risks of distributive governance, liability limitations and concerns about securities.",
    "DAOs aim to decrease operational and management inefficiencies through smart contracts and participatory governance. At the same time, clinical professor of law Aaron Wright highlighted the importance of “social and political dimensions of governance.” ",
    "Because humans aren’t perfectly rational and have limited capacity for information, he noted that direct voting through distributed consensus may be difficult to achieve because it requires consistent engagement and attentiveness from members. \n\n",
    "Additionally, DAOs’ lack of formal legal recognition could create potential liabilities for members and limit their ability to engage with traditional legal organizations. Since DAOs are not created as legal entities, they might lack the ability to shield members’ assets if the organization injures a third-party or cannot pay its creditors. However, state law efforts are already underway to adapt traditional business entities to DAOs. ",
    "Finally, DAOs rely on people and community engagement — it’s what incentivizes  members to keep coming back. Community culture can deteriorate if the core team loses interest or if tokens and prices dominate conversation, which can halt a DAO’s progress.",
    "DAOs are appealing because they are accessible, can rapidly pool and distribute capital, facilitate efficient voting processes and reduce the need to manually monitor fraud. By making group decisions more transparent and autonomous, they reduce organisational frictions and chances of fraudulent behaviour. Since they are digitally native and easy to join"
]

module.exports = para;

const addSampleReviews = async (req, res) => {
    let dao_list = await Dao.find();

    for (let i = 0; i < dao_list.length; i++) {
        let {
            rating,
            review_desc,
            resonate_vibes_rate,
            onboarding_exp,
            opinions_matter,
            great_org_structure,
            friend_recommend,
            great_incentives,
            user_discord_id,
            dao_name,
            guild_id,
            public_address
        } = reviewSample;

        let min = 70
        let max = 100

        rating = `${Math.floor(Math.random() * (5 - 3 + 1)) + 3}`;
        review_desc = para[Math.floor(Math.random() * (15 - 0 + 1)) + 0];
        resonate_vibes_rate = `${Math.floor(Math.random() * (max - min + 1)) + min}`;
        onboarding_exp = `${Math.floor(Math.random() * (max - min + 1)) + min}`;
        opinions_matter = `${Math.floor(Math.random() * (max - min + 1)) + min}`;
        great_org_structure = `${Math.floor(Math.random() * (max - min + 1)) + min}`;
        friend_recommend = `${Math.floor(Math.random() * (max - min + 1)) + min}`;
        great_incentives = `${Math.floor(Math.random() * (max - min + 1)) + min}`;
        user_discord_id = `${Math.floor(Math.random() * (max - min + 1)) + min}`;
        dao_name = dao_list[i].dao_name;
        guild_id = dao_list[i].guild_id;
        public_address = `0x${((Math.floor(Math.random() * 100000000000)) + 900000000000)}`

        let newReview = new Review({
            rating,
            review_desc,
            resonate_vibes_rate,
            onboarding_exp,
            opinions_matter,
            great_org_structure,
            friend_recommend,
            great_incentives,
            user_discord_id,
            dao_name,
            guild_id,
            public_address
        })

        await newReview.save();
        let count = await Review.count({ dao_name, guild_id });
        let dao = await Dao.findOne({ dao_name, guild_id });
        dao.review_count = count;
        console.log(dao)
        await dao.save();
    }
    res.status(200)
}

const RateReviewHandler = async (req, res) => {

    console.log(req.body);

    let review_id = req.body.review_id;
    let wallet_address = req.body.wallet_address;
    let type = req.body.type;

    let rating = type;

    let check_duplicate = await RateReview.find({
        "review_id": review_id,
        "wallet_address": wallet_address,
    })

    if (check_duplicate.length > 0) {
        console.log(check_duplicate)
        return res.status(403).send();
    }

    let rateReview = new RateReview({
        "review_id": review_id,
        "wallet_address": wallet_address,
        "rating": rating
    })

    console.log(rateReview)

    try {
        let db_res = await rateReview.save();
        if (db_res) {
            let rev_res = await Review.findById(review_id);
            if (rev_res) {
                if (rating) {
                    if (rev_res?.thumbs_up > 1) {
                        rev_res.thumbs_up = rev_res.thumbs_up + 1;
                    }
                    else {
                        rev_res.thumbs_up = 1;
                    }
                }
                else if (rev_res == false) {
                    if (rev_res?.thumbs_down > 1) {
                        rev_res.thumbs_down = rev_res.thumbs_down + 1;
                    }
                    else {
                        rev_res.thumbs_down = 1;
                    }
                }

                let fin_res = rev_res.save();

                if (fin_res) {
                    res.status(200).send();
                }
                else {
                    res.status(500).send();
                }

            } else {
                res.status(500).send();
            }
        } else {
            res.status(500).send();
        }
    }
    catch (er) {
        console.log(er)
        res.status(500).send();
    }

}

router.post('/rate-review', RateReviewHandler)

router.get('/add-review', addReview);
// router.get('/add-sample', addSampleReviews);

module.exports = router;