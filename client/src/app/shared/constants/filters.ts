export const filters = [
    {
        filterType: 'number',
        isPublic: true,
        slug: 'price',
        title: {ge: 'ფასი', en: 'Price', ru: 'Цена'},
        values: 0
    },
    {
        filterType: 'checkboxOnly',
        isPublic: true,
        slug: 'priceWithAgreement',
        title: {ge: 'ფასი შეთანხმებით', en: 'Price negotiable', ru: 'Цена по договоренности'},
        values: false
    },
    {
        filterType: 'checkboxOnly',
        isPublic: true,
        slug: 'canOfferPrice',
        title: {ge: 'ფასის შეთავაზება', en: 'Price quote', ru: 'Предложить Цену'},
        values: false,
    },
    {
        filterType: 'radio',
        isPublic: true,
        slug: 'condType',
        title: {ge: 'ნივთის მდგომარეობა', en: 'Condition of an item', ru: 'Состояние вещи'},
        values: [
            {id: '1', ge: 'ახალი', en: 'New', ru: 'Новая'},
            {id: '0', ge: 'მეორადი', en: 'Used', ru: 'Подержанная'},
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
        ]
    }
];