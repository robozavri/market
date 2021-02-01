export const filters = [
    {
        filterType: 'input',
        isPublic: true,
        slug: 'price',
        title: {ge: 'ფასი', en: 'Price', ru: 'Цена'},
        values: 0
    },
    {
        filterType: 'radio',
        isPublic: true,
        slug: 'canOfferPrice',
        title: {ge: 'ფასის შეთავაზება', en: 'Price quote', ru: 'Предложить Цену'},
        values: [
            {id: '1', ge: 'დიახ', en: 'Yes', ru: 'Да'},
            {id: '0', ge: 'არა', en: 'No', ru: 'Нет'},
            {id: '', ge: 'ყველა', en: 'All', ru: 'Все'}
        ]
    },
    {
        filterType: 'radio',
        isPublic: true,
        slug: 'condType',
        title: {ge: 'ნივთის მდგომარეობა', en: 'Condition of an item', ru: 'Состояние вещи'},
        values: [
            {id: '1', ge: 'ახალი', en: 'New', ru: 'Новая'},
            {id: '0', ge: 'მეორადი', en: 'Used', ru: 'Подержанная'},
            {id: '', ge: 'ყველა', en: 'All', ru: 'Все'}
        ]
    },
    {
        filterType: 'radio',
        isPublic: true,
        slug: 'adType',
        title: {ge: 'განცხადების ტიპი', en: 'Application type', ru: 'Тип заявления'},
        values: [
            {id: '6', ge: 'განვადებით', en: 'განვადებით', ru: 'განვადებით'},
            {id: '5', ge: 'ფასდაკლება', en: 'Discount', ru: 'Скидка'},
            {id: '4', ge: 'შევიძენ', en: 'Acquire', ru: 'Куплю'},
            {id: '3', ge: 'მაღაზია', en: 'Shop', ru: 'Магазин'},
            {id: '2', ge: 'კერძო', en: 'Private', ru: 'Частные'},
            {id: '', ge: 'ყველა', en: 'All', ru: 'Все'}
        ]
    }
];