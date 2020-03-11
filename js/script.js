const data = [
    {
        "firstname":"Виктор",
        "lastname":"Петров",
        "email":"test@test.com",
        "phonenumber":"77777777777",
        "birthday_contact":"1981-03-03",
        "company":"Company 1"
    },
    {
        "firstname":"Вася",
        "lastname":"Пупкин",
        "email":"test@test.com",
        "phonenumber":"333333333333",
        "birthday_contact":"2004-10-20",
        "company":"Company 2"
    },
    {
        "firstname":"Дима",
        "lastname":"Коршунов",
        "email":"test@test.com",
        "phonenumber":"22222222222",
        "birthday_contact":"1991-07-16",
        "company":"Company 3"
    },
    {
        "firstname":"Сан",
        "lastname":"Саныч",
        "email":"test@test.com",
        "phonenumber":"33333333333",
        "birthday_contact":"1998-07-03",
        "company":"Company 4"
    }
];

$('#example').DataTable({
    data: data,
    columns: [
        { data: 'firstname'},
        { data: 'lastname' },
        { data: 'email' },
        { data: 'phonenumber' },
        { data: 'birthday_contact'},
        { data: 'company'}
    ],
    columnDefs: [
        {
            targets: 0,
            title: Object.keys(data[0])[0],
        },

    ]
});

// function createThead () {
//   const table = $('table');
//   const captions  = Object.keys(data[0]);
//   let count = 0;
//
//
//   const thead = $('<thead></thead>');
//   const tr = $('<tr></tr>');
//
//   while (count < captions.length){
//       const th = $(`<th
//                     class="sorting_asc"
//                     tabindex="0"
//                     aria-controls="example"
//                     rowspan="1"
//                     aria-sort="ascending"
//                     aria-label=": activate to sort column descending"
//                     >
//
//                    </th>`);
//       th.text(`${captions[count]}`);
//       tr.append(th);
//       count++;
//   }
//
//     console.log(table)
//
//   thead.append(tr);
//   table.prepend(thead);
// }
//
// createThead();

$('#root').click(function () {
    console.log('hi')
});

