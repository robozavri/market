import * as _ from 'lodash';
import { cloneStub } from '../helpers/stub-helpers';

/*
const cities = {
	"320": {
		"id": "320",
		"title": {
			"ge": "თბილისი",
			"en": "Tbilisi",
			"ru": "Тбилиси"
		}
	},
	"3525": {
		"id": "3525",
		"title": {
			"ge": "აბაშა",
			"en": "Abasha",
			"ru": "Абаша"
		}
	},
	"3526": {
		"id": "3526",
		"title": {
			"ge": "ადიგენი",
			"en": "Adigeni",
			"ru": "Адигени"
		}
	},
	"3527": {
		"id": "3527",
		"title": {
			"ge": "ამბროლაური",
			"en": "Amrolauri",
			"ru": "Амбролаури"
		}
	},
	"3528": {
		"id": "3528",
		"title": {
			"ge": "ასპინძა",
			"en": "Aspindza",
			"ru": "Аспиндза"
		}
	},
	"3530": {
		"id": "3530",
		"title": {
			"ge": "ახალქალაქი",
			"en": "Akhalkalaki",
			"ru": "Ахалкалаки"
		}
	},
	"3531": {
		"id": "3531",
		"title": {
			"ge": "ახალციხე",
			"en": "Akhaltsikhe",
			"ru": "Ахалцихе"
		}
	},
	"3532": {
		"id": "3532",
		"title": {
			"ge": "ახმეტა",
			"en": "Akhmeta",
			"ru": "Ахмета"
		}
	},
	"3533": {
		"id": "3533",
		"title": {
			"ge": "ბათუმი",
			"en": "Batumi",
			"ru": "Батуми"
		}
	},
	"3534": {
		"id": "3534",
		"title": {
			"ge": "ბაღდათი",
			"en": "Bagdadi",
			"ru": "Багдати"
		}
	},
	"3535": {
		"id": "3535",
		"title": {
			"ge": "ბოლნისი",
			"en": "Bolnisi",
			"ru": "Болниси"
		}
	},
	"3536": {
		"id": "3536",
		"title": {
			"ge": "ბორჯომი",
			"en": "Borjomi",
			"ru": "Борджоми"
		}
	},
	"3539": {
		"id": "3539",
		"title": {
			"ge": "გარდაბანი",
			"en": "Gardabani",
			"ru": "Гардабани"
		}
	},
	"3540": {
		"id": "3540",
		"title": {
			"ge": "გორი",
			"en": "Gori",
			"ru": "Гори"
		}
	},
	"3543": {
		"id": "3543",
		"title": {
			"ge": "გურჯაანი",
			"en": "Gurjaani",
			"ru": "Гурджаани"
		}
	},
	"3544": {
		"id": "3544",
		"title": {
			"ge": "დედოფლისწყარო",
			"en": "Dedoplistskaro",
			"ru": "Дедофлисцкаро"
		}
	},
	"3545": {
		"id": "3545",
		"title": {
			"ge": "დმანისი",
			"en": "Dmanisi",
			"ru": "Дманиси"
		}
	},
	"3546": {
		"id": "3546",
		"title": {
			"ge": "დუშეთი",
			"en": "Dusheti",
			"ru": "Душети"
		}
	},
	"3547": {
		"id": "3547",
		"title": {
			"ge": "ვანი",
			"en": "Vani",
			"ru": "Вани"
		}
	},
	"3548": {
		"id": "3548",
		"title": {
			"ge": "ზესტაფონი",
			"en": "Zestaponi",
			"ru": "Зестафони"
		}
	},
	"3549": {
		"id": "3549",
		"title": {
			"ge": "ზუგდიდი",
			"en": "Zugdidi",
			"ru": "Зугдиди"
		}
	},
	"3550": {
		"id": "3550",
		"title": {
			"ge": "თეთრიწყარო",
			"en": "Tetritskaro",
			"ru": "Тетрицкаро"
		}
	},
	"3551": {
		"id": "3551",
		"title": {
			"ge": "თელავი",
			"en": "Telavi",
			"ru": "Телави"
		}
	},
	"3552": {
		"id": "3552",
		"title": {
			"ge": "თერჯოლა",
			"en": "Terjola",
			"ru": "Терджола"
		}
	},
	"3553": {
		"id": "3553",
		"title": {
			"ge": "თიანეთი",
			"en": "Tianeti",
			"ru": "Тианети"
		}
	},
	"3554": {
		"id": "3554",
		"title": {
			"ge": "კასპი",
			"en": "Kaspi",
			"ru": "Каспи"
		}
	},
	"3555": {
		"id": "3555",
		"title": {
			"ge": "ლაგოდეხი",
			"en": "Lagodekhi",
			"ru": "Лагодехи"
		}
	},
	"3556": {
		"id": "3556",
		"title": {
			"ge": "ლანჩხუთი",
			"en": "Lanchkhuti",
			"ru": "Ланчхути"
		}
	},
	"3557": {
		"id": "3557",
		"title": {
			"ge": "ლენტეხი",
			"en": "Lentekhi",
			"ru": "Лентехи"
		}
	},
	"3558": {
		"id": "3558",
		"title": {
			"ge": "მარნეული",
			"en": "Marneuli",
			"ru": "Марнеули"
		}
	},
	"3559": {
		"id": "3559",
		"title": {
			"ge": "მარტვილი",
			"en": "Martvili",
			"ru": "Мартвили"
		}
	},
	"3560": {
		"id": "3560",
		"title": {
			"ge": "მესტია",
			"en": "Mestia",
			"ru": "Местиа"
		}
	},
	"3561": {
		"id": "3561",
		"title": {
			"ge": "მცხეთა",
			"en": "Mtskheta",
			"ru": "Мцхета"
		}
	},
	"3562": {
		"id": "3562",
		"title": {
			"ge": "ნინოწმინდა",
			"en": "Ninotsminda",
			"ru": "Ниноцминда"
		}
	},
	"3563": {
		"id": "3563",
		"title": {
			"ge": "ოზურგეთი",
			"en": "Ozurgeti",
			"ru": "Озургети"
		}
	},
	"3564": {
		"id": "3564",
		"title": {
			"ge": "ონი",
			"en": "Oni",
			"ru": "Они"
		}
	},
	"3566": {
		"id": "3566",
		"title": {
			"ge": "რუსთავი",
			"en": "Rustavi",
			"ru": "Рустави"
		}
	},
	"3567": {
		"id": "3567",
		"title": {
			"ge": "საგარეჯო",
			"en": "Sagarejo",
			"ru": "Сагареджо"
		}
	},
	"3568": {
		"id": "3568",
		"title": {
			"ge": "სამტრედია",
			"en": "Samtredia",
			"ru": "Самтредиа"
		}
	},
	"3569": {
		"id": "3569",
		"title": {
			"ge": "საჩხერე",
			"en": "Sachkhere",
			"ru": "Сачхере"
		}
	},
	"3570": {
		"id": "3570",
		"title": {
			"ge": "სენაკი",
			"en": "Senaki",
			"ru": "Сенаки"
		}
	},
	"3571": {
		"id": "3571",
		"title": {
			"ge": "სიღნაღი",
			"en": "Signagi",
			"ru": "Сигнаги"
		}
	},
	"3574": {
		"id": "3574",
		"title": {
			"ge": "ტყიბული",
			"en": "Tkibuli",
			"ru": "Ткибули"
		}
	},
	"3575": {
		"id": "3575",
		"title": {
			"ge": "ფოთი",
			"en": "Poti",
			"ru": "Поти"
		}
	},
	"3576": {
		"id": "3576",
		"title": {
			"ge": "ქარელი",
			"en": "Kareli",
			"ru": "Карели"
		}
	},
	"3577": {
		"id": "3577",
		"title": {
			"ge": "ქედა ",
			"en": "Keda",
			"ru": "Кеда "
		}
	},
	"3578": {
		"id": "3578",
		"title": {
			"ge": "ქობულეთი",
			"en": "Kobuleti",
			"ru": "Кобулети"
		}
	},
	"3579": {
		"id": "3579",
		"title": {
			"ge": "ქუთაისი",
			"en": "Kutaisi",
			"ru": "Кутаиси"
		}
	},
	"3580": {
		"id": "3580",
		"title": {
			"ge": "სტეფანწმინდა",
			"en": "Stepantsminda",
			"ru": "Стефанцминда"
		}
	},
	"3581": {
		"id": "3581",
		"title": {
			"ge": "ყვარელი",
			"en": "Kvareli",
			"ru": "Кварели"
		}
	},
	"3582": {
		"id": "3582",
		"title": {
			"ge": "შუახევი",
			"en": "Shuakhevi",
			"ru": "Шуахеви"
		}
	},
	"3583": {
		"id": "3583",
		"title": {
			"ge": "ჩოხატაური",
			"en": "Chokhatauri",
			"ru": "Чохатаури"
		}
	},
	"3584": {
		"id": "3584",
		"title": {
			"ge": "ჩხოროწყუ",
			"en": "Chkhorotsku",
			"ru": "Чхороцку"
		}
	},
	"3585": {
		"id": "3585",
		"title": {
			"ge": "ცაგერი",
			"en": "Tsageri",
			"ru": "Цагери"
		}
	},
	"3587": {
		"id": "3587",
		"title": {
			"ge": "წალენჯიხა",
			"en": "Tsalenjikha",
			"ru": "Цаленджиха"
		}
	},
	"3588": {
		"id": "3588",
		"title": {
			"ge": "წალკა",
			"en": "Tsalka",
			"ru": "Цалка"
		}
	},
	"3589": {
		"id": "3589",
		"title": {
			"ge": "წყალტუბო",
			"en": "Tskaltubo",
			"ru": "Цкалтубо"
		}
	},
	"3590": {
		"id": "3590",
		"title": {
			"ge": "ჭიათურა",
			"en": "Chiatura",
			"ru": "Чиатура"
		}
	},
	"3591": {
		"id": "3591",
		"title": {
			"ge": "ხარაგაული",
			"en": "Kharagauli",
			"ru": "Харагаули"
		}
	},
	"3592": {
		"id": "3592",
		"title": {
			"ge": "ხაშური",
			"en": "Khashuri",
			"ru": "Хашури"
		}
	},
	"3593": {
		"id": "3593",
		"title": {
			"ge": "ხელვაჩაური",
			"en": "Khelvachauri",
			"ru": "Хелвачаури"
		}
	},
	"3594": {
		"id": "3594",
		"title": {
			"ge": "ხობი",
			"en": "Khobi",
			"ru": "Хоби"
		}
	},
	"3595": {
		"id": "3595",
		"title": {
			"ge": "ხონი",
			"en": "Khoni",
			"ru": "Хони"
		}
	},
	"3596": {
		"id": "3596",
		"title": {
			"ge": "ხულო",
			"en": "Khulo",
			"ru": "Хуло"
		}
	},
	"8737": {
		"id": "8737",
		"title": {
			"ge": "ოქროყანა",
			"en": "Okrokana",
			"ru": "Окрокана"
		}
	}
}
*/
const citiesArray = [{
	id: "320",
	title: {
	  en: "Tbilisi",
	  ge: "თბილისი",
	  ru: "Тбилиси"
	}
  }, {
	id: "3525",
	title: {
	  en: "Abasha",
	  ge: "აბაშა",
	  ru: "Абаша"
	}
  }, {
	id: "3526",
	title: {
	  en: "Adigeni",
	  ge: "ადიგენი",
	  ru: "Адигени"
	}
  }, {
	id: "3527",
	title: {
	  en: "Amrolauri",
	  ge: "ამბროლაური",
	  ru: "Амбролаури"
	}
  }, {
	id: "3528",
	title: {
	  en: "Aspindza",
	  ge: "ასპინძა",
	  ru: "Аспиндза"
	}
  }, {
	id: "3530",
	title: {
	  en: "Akhalkalaki",
	  ge: "ახალქალაქი",
	  ru: "Ахалкалаки"
	}
  }, {
	id: "3531",
	title: {
	  en: "Akhaltsikhe",
	  ge: "ახალციხე",
	  ru: "Ахалцихе"
	}
  }, {
	id: "3532",
	title: {
	  en: "Akhmeta",
	  ge: "ახმეტა",
	  ru: "Ахмета"
	}
  }, {
	id: "3533",
	title: {
	  en: "Batumi",
	  ge: "ბათუმი",
	  ru: "Батуми"
	}
  }, {
	id: "3534",
	title: {
	  en: "Bagdadi",
	  ge: "ბაღდათი",
	  ru: "Багдати"
	}
  }, {
	id: "3535",
	title: {
	  en: "Bolnisi",
	  ge: "ბოლნისი",
	  ru: "Болниси"
	}
  }, {
	id: "3536",
	title: {
	  en: "Borjomi",
	  ge: "ბორჯომი",
	  ru: "Борджоми"
	}
  }, {
	id: "3539",
	title: {
	  en: "Gardabani",
	  ge: "გარდაბანი",
	  ru: "Гардабани"
	}
  }, {
	id: "3540",
	title: {
	  en: "Gori",
	  ge: "გორი",
	  ru: "Гори"
	}
  }, {
	id: "3543",
	title: {
	  en: "Gurjaani",
	  ge: "გურჯაანი",
	  ru: "Гурджаани"
	}
  }, {
	id: "3544",
	title: {
	  en: "Dedoplistskaro",
	  ge: "დედოფლისწყარო",
	  ru: "Дедофлисцкаро"
	}
  }, {
	id: "3545",
	title: {
	  en: "Dmanisi",
	  ge: "დმანისი",
	  ru: "Дманиси"
	}
  }, {
	id: "3546",
	title: {
	  en: "Dusheti",
	  ge: "დუშეთი",
	  ru: "Душети"
	}
  }, {
	id: "3547",
	title: {
	  en: "Vani",
	  ge: "ვანი",
	  ru: "Вани"
	}
  }, {
	id: "3548",
	title: {
	  en: "Zestaponi",
	  ge: "ზესტაფონი",
	  ru: "Зестафони"
	}
  }, {
	id: "3549",
	title: {
	  en: "Zugdidi",
	  ge: "ზუგდიდი",
	  ru: "Зугдиди"
	}
  }, {
	id: "3550",
	title: {
	  en: "Tetritskaro",
	  ge: "თეთრიწყარო",
	  ru: "Тетрицкаро"
	}
  }, {
	id: "3551",
	title: {
	  en: "Telavi",
	  ge: "თელავი",
	  ru: "Телави"
	}
  }, {
	id: "3552",
	title: {
	  en: "Terjola",
	  ge: "თერჯოლა",
	  ru: "Терджола"
	}
  }, {
	id: "3553",
	title: {
	  en: "Tianeti",
	  ge: "თიანეთი",
	  ru: "Тианети"
	}
  }, {
	id: "3554",
	title: {
	  en: "Kaspi",
	  ge: "კასპი",
	  ru: "Каспи"
	}
  }, {
	id: "3555",
	title: {
	  en: "Lagodekhi",
	  ge: "ლაგოდეხი",
	  ru: "Лагодехи"
	}
  }, {
	id: "3556",
	title: {
	  en: "Lanchkhuti",
	  ge: "ლანჩხუთი",
	  ru: "Ланчхути"
	}
  }, {
	id: "3557",
	title: {
	  en: "Lentekhi",
	  ge: "ლენტეხი",
	  ru: "Лентехи"
	}
  }, {
	id: "3558",
	title: {
	  en: "Marneuli",
	  ge: "მარნეული",
	  ru: "Марнеули"
	}
  }, {
	id: "3559",
	title: {
	  en: "Martvili",
	  ge: "მარტვილი",
	  ru: "Мартвили"
	}
  }, {
	id: "3560",
	title: {
	  en: "Mestia",
	  ge: "მესტია",
	  ru: "Местиа"
	}
  }, {
	id: "3561",
	title: {
	  en: "Mtskheta",
	  ge: "მცხეთა",
	  ru: "Мцхета"
	}
  }, {
	id: "3562",
	title: {
	  en: "Ninotsminda",
	  ge: "ნინოწმინდა",
	  ru: "Ниноцминда"
	}
  }, {
	id: "3563",
	title: {
	  en: "Ozurgeti",
	  ge: "ოზურგეთი",
	  ru: "Озургети"
	}
  }, {
	id: "3564",
	title: {
	  en: "Oni",
	  ge: "ონი",
	  ru: "Они"
	}
  }, {
	id: "3566",
	title: {
	  en: "Rustavi",
	  ge: "რუსთავი",
	  ru: "Рустави"
	}
  }, {
	id: "3567",
	title: {
	  en: "Sagarejo",
	  ge: "საგარეჯო",
	  ru: "Сагареджо"
	}
  }, {
	id: "3568",
	title: {
	  en: "Samtredia",
	  ge: "სამტრედია",
	  ru: "Самтредиа"
	}
  }, {
	id: "3569",
	title: {
	  en: "Sachkhere",
	  ge: "საჩხერე",
	  ru: "Сачхере"
	}
  }, {
	id: "3570",
	title: {
	  en: "Senaki",
	  ge: "სენაკი",
	  ru: "Сенаки"
	}
  }, {
	id: "3571",
	title: {
	  en: "Signagi",
	  ge: "სიღნაღი",
	  ru: "Сигнаги"
	}
  }, {
	id: "3574",
	title: {
	  en: "Tkibuli",
	  ge: "ტყიბული",
	  ru: "Ткибули"
	}
  }, {
	id: "3575",
	title: {
	  en: "Poti",
	  ge: "ფოთი",
	  ru: "Поти"
	}
  }, {
	id: "3576",
	title: {
	  en: "Kareli",
	  ge: "ქარელი",
	  ru: "Карели"
	}
  }, {
	id: "3577",
	title: {
	  en: "Keda",
	  ge: "ქედა ",
	  ru: "Кеда "
	}
  }, {
	id: "3578",
	title: {
	  en: "Kobuleti",
	  ge: "ქობულეთი",
	  ru: "Кобулети"
	}
  }, {
	id: "3579",
	title: {
	  en: "Kutaisi",
	  ge: "ქუთაისი",
	  ru: "Кутаиси"
	}
  }, {
	id: "3580",
	title: {
	  en: "Stepantsminda",
	  ge: "სტეფანწმინდა",
	  ru: "Стефанцминда"
	}
  }, {
	id: "3581",
	title: {
	  en: "Kvareli",
	  ge: "ყვარელი",
	  ru: "Кварели"
	}
  }, {
	id: "3582",
	title: {
	  en: "Shuakhevi",
	  ge: "შუახევი",
	  ru: "Шуахеви"
	}
  }, {
	id: "3583",
	title: {
	  en: "Chokhatauri",
	  ge: "ჩოხატაური",
	  ru: "Чохатаури"
	}
  }, {
	id: "3584",
	title: {
	  en: "Chkhorotsku",
	  ge: "ჩხოროწყუ",
	  ru: "Чхороцку"
	}
  }, {
	id: "3585",
	title: {
	  en: "Tsageri",
	  ge: "ცაგერი",
	  ru: "Цагери"
	}
  }, {
	id: "3587",
	title: {
	  en: "Tsalenjikha",
	  ge: "წალენჯიხა",
	  ru: "Цаленджиха"
	}
  }, {
	id: "3588",
	title: {
	  en: "Tsalka",
	  ge: "წალკა",
	  ru: "Цалка"
	}
  }, {
	id: "3589",
	title: {
	  en: "Tskaltubo",
	  ge: "წყალტუბო",
	  ru: "Цкалтубо"
	}
  }, {
	id: "3590",
	title: {
	  en: "Chiatura",
	  ge: "ჭიათურა",
	  ru: "Чиатура"
	}
  }, {
	id: "3591",
	title: {
	  en: "Kharagauli",
	  ge: "ხარაგაული",
	  ru: "Харагаули"
	}
  }, {
	id: "3592",
	title: {
	  en: "Khashuri",
	  ge: "ხაშური",
	  ru: "Хашури"
	}
  }, {
	id: "3593",
	title: {
	  en: "Khelvachauri",
	  ge: "ხელვაჩაური",
	  ru: "Хелвачаури"
	}
  }, {
	id: "3594",
	title: {
	  en: "Khobi",
	  ge: "ხობი",
	  ru: "Хоби"
	}
  }, {
	id: "3595",
	title: {
	  en: "Khoni",
	  ge: "ხონი",
	  ru: "Хони"
	}
  }, {
	id: "3596",
	title: {
	  en: "Khulo",
	  ge: "ხულო",
	  ru: "Хуло"
	}
  }, {
	id: "8737",
	title: {
	  en: "Okrokana",
	  ge: "ოქროყანა",
	  ru: "Окрокана"
	}
}];

const CityStub = {
  id: '',
  title: { en: 'title en', ge: 'title ge', ru: 'title ru' },
  isFeatured: true,
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(CityStub),
    ...fields
  };
}

export function getMany() {
  return _.range(citiesArray.length).map((i: number) => citiesArray[i]);
}