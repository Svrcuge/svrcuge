// Medijski članci o Svrčugama. Dodaj nove unose ovdje.
// Slike se rotiraju automatski (vidi MEDIA_IMAGES u stranici mediji).
export type PressItem = {
  outlet: string;
  title: string;
  url: string;
  type?: "article" | "video" | "social";
};

export const PRESS: PressItem[] = [
  { outlet: "Telegraf", title: "O ovom selu priča cijeli Balkan: mještani Renoom 4 kreću do Pariza", url: "https://www.telegraf.rs/vesti/jugosfera/4278291-o-ovom-selu-prica-ceo-balkan-mestani-renoom-4-krecu-do-pariza-razlog-je-neverovatan" },
  { outlet: "Blic", title: "Selo bez rasvjete kreće ka Parizu u Renaultu 4: misija iz Crne Gore oduševila region", url: "https://www.blic.rs/slobodno-vreme/selo-bez-rasvete-krece-ka-parizu-u-renaultu-4-misija-iz-crne-gore-odusevila-region/tjj91z7" },
  { outlet: "Politika", title: "Renoom 4 u Pariz po rasvjetu i budućnost Svrčuga kod Herceg Novog", url: "https://www.politika.rs/sr/clanak/749857/renoom-4-u-pariz-po-rasvetu-i-buducnost-svrcuga-kod-herceg-novog" },
  { outlet: "Nova.rs", title: "Selo sa pet stanovnika je jedino na svijetu koje ima sajt i mreže, ali nema uličnu rasvjetu", url: "https://nova.rs/magazin/prica-se/selo-u-komsiluku-sa-pet-stanovnika-je-jedino-na-svetu-koje-ima-sajt-i-drustvene-mreze-ali-nema-ulicnu-rasvetu/" },
  { outlet: "CDM", title: "Mještani hercegnovskog sela Svrčuge do Pariza za javnu rasvjetu", url: "https://www.cdm.me/drustvo/mjestani-hercegnovskog-sela-svrcuge-do-pariza-za-javnu-rasvjetu/" },
  { outlet: "RTCG", title: "Mještani hercegnovskog sela Svrčuge do Pariza za javnu rasvjetu", url: "https://rtcg.me/vijesti/drustvo/810131/mjestani-hercegnovskog-sela-svrcuge-do-pariza-za-javnu-rasvjetu.html" },
  { outlet: "Pobjeda", title: "Malim divom iz Svrčuge do Pariza za uličnu rasvjetu", url: "https://www.pobjeda.me/clanak/malim-divom-iz-svrcuge-do-pariza-za-ulicnu-rasvjetu" },
  { outlet: "Pobjeda", title: "Ekspedicija iz Svrčuga u Pariz stigla malim divom", url: "https://www.pobjeda.me/clanak/ekspedicija-iz-svrcuga-u-pariz-stigla-malim-divom" },
  { outlet: "Dan", title: "Mještani pokrenuli inicijativu: od Svrčuga do Pariza za izgradnju LED rasvjete", url: "https://www.dan.co.me/crna-gora/mjestani-pokrenuli-inicijativu-od-svrcuga-do-pariza-za-izgradnju-led-rasvjete-5337282" },
  { outlet: "Nezavisne", title: "Nevjerovatna priča: mještani sela Svrčuge zbog rasvjete idu do Pariza", url: "https://www.nezavisne.com/novosti/ex-yu/Nevjerovatna-prica-Mjestani-sela-Svrcuge-zbog-rasvjete-idu-do-Pariza/951892" },
  { outlet: "Espreso", title: "Mještani Svrčuge krenuli Renoom za Pariz: o ovom selu bruji Balkan", url: "https://www.espreso.co.rs/svet/crna-gora/1586761/mestani-svrcuge-krenuli-renoom-za-pariz-i-po-ovu-stvar-o-ovom-selu-bruji-balkan-nemaju-ulicnu-rasvetu-ali-zato" },
  { outlet: "Dnevnik", title: "Svrčuge postale hit na društvenim mrežama: kreću na simboličan put do Pariza", url: "https://www.dnevnik.rs/lat/vesti/region/svrcuge-postale-hit-na-drustvenim-mrezama-objava-pokrenula-lavinu-dobrih-dela-mestani-sela-bez-ulicne-rasvete-krecu-uskoro-na-simbolican-put-do-pariza-2026-02-25" },
  { outlet: "Mondo.rs", title: "Selo Svrčuge sa 5 stanovnika jedino na svijetu ima sajt, ali nema uličnu rasvjetu", url: "https://mondo.rs/Info/EX-YU/a2191470/selo-svrcuge-sa-5-stanovnika-jedino-na-svetu-ima-sajt-ali-nema-ulicnu-rasvetu.html" },
  { outlet: "Mondo.ba", title: "Jovica Tušup iz Svrčuga o inicijativi Svjetlo za Svrčuge", url: "https://mondo.ba/Info/Region/a1453034/jovica-tusup-iz-svrcuga-o-inicijativi-svjetlo-za-svrcuge.html" },
  { outlet: "Alo BiH", title: "Jedinstveno selo na svijetu: Svrčuge zbog rasvjete idu do Pariza", url: "https://aloonline.ba/Region/101234111/jedinstveno-selo-na-svijetu-svrcuge-zbog-rasvjete-idu-do-pariza.html" },
  { outlet: "Alo", title: "Svrčuge imaju sajt i Instagram, a nemaju uličnu rasvjetu: Renoom 4 kreću po svjetlo", url: "https://lepotesrbije.alo.rs/zanimljivosti/vesti/5017021/svrcuge-kod-herceg-novog-imaju-svoj-sajt-i-instagram-a-nemaju-ulicnu-rasvetu---mestani-renoom-4-krecu-do-pariza-po-svetlo.html" },
  { outlet: "Upravo.rs", title: "Mještani Svrčuge simbolično putuju u Pariz po svjetlo", url: "https://upravo.rs/story/138891/me%C5%A1tani-svr%C4%8Duge-simboli%C4%8Dno-putuju-u-pariz-po-svetlo-za" },
  { outlet: "ATV", title: "Selo Svrčuge postalo pravi hit na društvenim mrežama", url: "https://atvbl.rs/lat/vijesti/region/selo-svrcuge-postalo-pravi-hit-na-na-drustvenim-mrezama/2252489" },
  { outlet: "Mediteran News", title: "Mještani hercegnovskog sela Svrčuge do Pariza za javnu rasvjetu", url: "https://mediterannews.me/article/mjestani-hercegnovskog-sela-svrcuge-do-pariza-za-javnu-rasvjetu" },
  { outlet: "Moj Portal", title: "Nesvakidašnja avantura: mještani Svrčuge kreću na put do Pariza legendarnim Renaultom 4", url: "https://mojportal.me/nesvakidasnja-avantura-mjestani-sela-svrcuge-kod-herceg-novog-krecu-na-put-do-pariza-sa-legendarnim-renault-4/" },
  { outlet: "Boka News", title: "Mještani hercegnovskog sela Svrčuge do Pariza za javnu rasvjetu", url: "https://bokanews.me/mjestani-hercegnovskog-sela-svrcuge-do-pariza-za-javnu-rasvjetu/" },
  { outlet: "Boka News", title: "Reno 4 iz Svrčuga sve bliže Parizu", url: "https://bokanews.me/reno-4-iz-svrcuga-sve-blize-parizu/" },
  { outlet: "RTHN", title: "Svjetlo za Svrčuge: Renoom 4 iz Svrčuga do Pariza za LED rasvjetu u selu", url: "https://rthn.co.me/svjetlo-za-svrcuge-renoom-4-iz-svrcuga-do-pariza-za-led-rasvjetu-u-selu2/" },
  { outlet: "RTHN", title: "Doček ekspedicije iz Pariza: Svrčuge korak bliže javnoj rasvjeti", url: "https://rthn.co.me/docek-ekspedicije-iz-pariza-svrcuge-korak-blize-javnoj-rasvjeti/" },
  { outlet: "RTNK", title: "Mještani hercegnovskog sela Svrčuge do Pariza za javnu rasvjetu", url: "https://rtnk.me/drustvo/mjestani-hercegnovskog-sela-svrcuge-do-pariza-za-javnu-rasvjetu/" },
  { outlet: "RTNK", title: "Ekipa iz Svrčuga stigla u Pariz", url: "https://rtnk.me/drustvo/video-ekipa-iz-svrcuga-stigla-u-pariz/", type: "video" },
  { outlet: "Sjever CG", title: "Malim divom iz Svrčuge do Pariza za uličnu rasvjetu", url: "https://www.sjevercg.me/malim-divom-iz-svrcuge-do-pariza-za-ulicnu-rasvjetu/" },
  { outlet: "RTV K3", title: "Nevjerovatna priča: mještani sela Svrčuge zbog rasvjete idu do Pariza", url: "https://tvk3.info/nevjerovatna-prica-mjestani-sela-svrcuge-zbog-rasvjete-idu-do-pariza-foto/" },
  { outlet: "Radio Titograd", title: "Svjetlo za Svrčuge: nesvakidašnja akcija", url: "https://radiotitograd.me/titogradske-vijesti/svjetlo-za-svrcuge-nesvakidasnja-akcija/" },
  { outlet: "Ljepota i zdravlje", title: "Svjetlo za Svrčuge: put od 5.000 kilometara da bi zasijalo selo", url: "https://ljepotaizdravlje.me/motivacija/svjetlo-za-svrcuge-put-od-5-000-kilometara-da-bi-zasijalo-selo/" },
  { outlet: "Novski", title: "Podržimo inicijativu Svjetlo za Svrčuge", url: "https://novski.me/podrzimo-inicijativu-svjetlo-za-svrcuge/" },
  { outlet: "Novski", title: "Svrčuge stigle u Pariz", url: "https://novski.me/svrcuge-stigle-u-pariz/" },
  { outlet: "Rina", title: "Foto: Mještani Svrčuge kreću Renoom 4 za Pariz", url: "https://www.rina.rs/item/29929-/foto/" },
  { outlet: "Feral", title: "Svjetlo za Svrčuge", url: "https://feral.bar/post/42731" },
  { outlet: "Travel Montenegro", title: "Da li ste spremni za najluđu priču ove godine? Ljudi iz sela Svrčuge…", url: "https://www.facebook.com/travelmontenegro.me/posts/1313428320821522/", type: "social" },
  { outlet: "Instagram", title: "Svjetlo za Svrčuge (objava)", url: "https://www.instagram.com/p/DUjJjbriBv8/", type: "social" },
  { outlet: "Instagram", title: "Svrčuge (objava)", url: "https://www.instagram.com/p/DUnjBxDjNde/", type: "social" },
];
