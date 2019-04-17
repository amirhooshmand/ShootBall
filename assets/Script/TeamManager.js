
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

        this.teams = [];

        this.teams.push({
            name: "استقلال",
            id: 0,
            price: 500
        });

        this.teams.push({
            name: "استقلال خ",
            id: 1,
            price: 0
        });

        this.teams.push({
            name: "پارس جم",
            id: 2,
            price: 150
        });

        this.teams.push({
            name: "    پدیده",
            id: 3,
            price: 150
        });

        this.teams.push({
            name: "پرسپولیس",
            id: 4,
            price: 150
        });

        this.teams.push({
            name: "پیکان",
            id: 5,
            price: 150
        });

        this.teams.push({
            name: "تراکتورسازی",
            id: 6,
            price: 150
        });

        this.teams.push({
            name: "ذوب آهن",
            id: 7,
            price: 150,
            numberColor: "black"
        });

        this.teams.push({
            name: "سایپا",
            id: 8,
            price: 150
        });

        this.teams.push({
            name: "سپاهان",
            id: 9,
            price: 150,
            numberColor: "black"
        });

        this.teams.push({
            name: "سپیدرود رشت",
            id: 10,
            price: 150
        });

        this.teams.push({
            name: "صنعت نفت آبادان",
            id: 11,
            price: 150
        });

        this.teams.push({
            name: "فولاد",
            id: 12,
            price: 150,
            numberColor: "black"
        });

        this.teams.push({
            name: "ماشین سازی",
            id: 13,
            price: 150
        });

        this.teams.push({
            name: "نساجی مازندران",
            id: 14,
            price: 150
        });

        this.teams.push({
            name: "نفت مسجد سلیمان",
            id: 15,
            price: 150
        });



        this.players = [];

        this.players.push({
            teamID: 0,
            number: 17,
            headName: "team_ss_humam",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 0,
            number: 90,
            headName: "team_ss_mensha",
            bodyColor: 2,
        });
        this.players.push({
            teamID: 0,
            number: 21,
            headName: "team_ss_voria",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 1,
            number: 10,
            headName: "team_ss_kh_ayoub",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 1,
            number: 17,
            headName: "team_ss_kh_darvishi",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 1,
            number: 2,
            headName: "team_ss_kh_ahmad",
            bodyColor: 1,
        });

        this.players.push({
            teamID: 2,
            number: 11,
            headName: "team_pars_hatami",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 2,
            number: 4,
            headName: "team_pars_lotfi",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 2,
            number: 6,
            headName: "team_pars_meysam",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 3,
            number: 9,
            headName: "team_padide_ghasemi",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 3,
            number: 60,
            headName: "team_padide_shakeri",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 3,
            number: 7,
            headName: "team_padide_nasehi",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 4,
            number: 4,
            headName: "team_pers_jalal",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 4,
            number: 70,
            headName: "team_pers_alipur",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 4,
            number: 88,
            headName: "team_pers_siamak",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 5,
            number: 10,
            headName: "team_peykan_momeni",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 5,
            number: 11,
            headName: "team_peykan_ghazi",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 5,
            number: 6,
            headName: "team_peykan_magno",
            bodyColor: 2,
        });

        this.players.push({
            teamID: 6,
            number: 28,
            headName: "team_tt_stokes",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 6,
            number: 21,
            headName: "team_tt_ashkan",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 6,
            number: 26,
            headName: "team_tt_hajsafi",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 7,
            number: 2,
            headName: "team_zob_nejad",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 7,
            number: 10,
            headName: "team_zob_khalat",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 7,
            number: 8,
            headName: "team_zob_hadadi",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 8,
            number: 32,
            headName: "team_saipa_soleimani",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 8,
            number: 21,
            headName: "team_saipa_khaledi",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 8,
            number: 7,
            headName: "team_saipa_rezavand",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 9,
            number: 5,
            headName: "team_sepahan_ezat",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 9,
            number: 88,
            headName: "team_sepahan_keyrosh",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 9,
            number: 8,
            headName: "team_sepahan_navidkia",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 10,
            number: 5,
            headName: "team_sepid_sheikh",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 10,
            number: 8,
            headName: "team_sepid_ebrahimi",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 10,
            number: 99,
            headName: "team_sepid_gholami",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 11,
            number: 11,
            headName: "team_naft_jahani",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 11,
            number: 17,
            headName: "team_naft_pakdel",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 11,
            number: 4,
            headName: "team_naft_ahl",
            bodyColor: 1,
        });

        this.players.push({
            teamID: 12,
            number: 6,
            headName: "team_foolad_doraghi",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 12,
            number: 4,
            headName: "team_foolad_vali",
            bodyColor: 1,
        });
        this.players.push({
            teamID: 12,
            number: 29,
            headName: "team_foolad_luciano",
            bodyColor: 2,
        });

        this.players.push({
            teamID: 13,
            number: 13,
            headName: "team_mashin_yousefi",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 13,
            number: 10,
            headName: "team_mashin_khaleghi",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 13,
            number: 6,
            headName: "team_mashin_kanani",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 14,
            number: 13,
            headName: "team_nasaji_abashk",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 14,
            number: 50,
            headName: "team_nasaji_george",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 14,
            number: 33,
            headName: "team_nasaji_abbas",
            bodyColor: 0,
        });

        this.players.push({
            teamID: 15,
            number: 88,
            headName: "team_masjed_sharifat",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 15,
            number: 10,
            headName: "team_masjed_milad",
            bodyColor: 0,
        });
        this.players.push({
            teamID: 15,
            number: 5,
            headName: "team_masjed_mousa",
            bodyColor: 2,
        });
    },
});