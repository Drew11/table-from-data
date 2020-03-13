const dataArr = [
    {
        "firstname": "Виктор",
        "lastname": "Петров",
        "email": "test@test.com",
        "phonenumber": "77777777777",
        "birthday_contact": "1981-03-03",
        "company": "Company 1"
    },
    {
        "firstname": "Вася",
        "lastname": "Пупкин",
        "email": "test@test.com",
        "phonenumber": "333333333333",
        "birthday_contact": "2004-10-20",
        "company": "Company 2"
    },
    {
        "firstname": "Дима",
        "lastname": "Коршунов",
        "email": "test@test.com",
        "phonenumber": "22222222222",
        "birthday_contact": "1991-07-16",
        "company": "Company 3"
    },
    {
        "firstname": "Сан",
        "lastname": "Саныч",
        "email": "test@test.com",
        "phonenumber": "33333333333",
        "birthday_contact": "1998-07-03",
        "company": "Company 4"
    },

    {
        "firstname": "Змей",
        "lastname": "Горыныч",
        "email": "test@test.com",
        "phonenumber": "33333333333",
        "birthday_contact": "1998-11-03",
        "company": "Company 4"
    }
];
const select = `
<select name="query-select" id="">
    <option value="year" name="year" > Year</option>
    <option value="month" >Month</option>
</select>`;

function switchOptions(targetColumn, listenColumn, selected) {

    const order = [...table.state().order];
    const options = getOptoinTable(dataArr, selected);
    const columnDefs = [...options.columnDefs];

    columnDefs.push({
        orderData: [listenColumn],
        targets: [targetColumn],
    });

    const data = {
        ...options,
        order,
        columnDefs
    };
    table.destroy();
    $('#example').html('');
    table = $('#example').DataTable(data);
}

function getMonth(a) {
    const indices = [];
    for (let i = 0; i < a.birthday_contact.length; i++) {
        if (a.birthday_contact[i] === '-') indices.push(i);
    }
    const month = a.birthday_contact.slice(indices[0] + 1, indices[1]);
    return month;
}

function getOptoinTable(data, selected = 'year') {
    const columns = [];
    const columnDefs = [];
    const keys = Object.keys({...data[0]});
    console.log(data);

    const updateData = data.map(obj => {
        const copy = {...obj};
        copy.months = getMonth(obj);
        return copy;
    });
    const captions = Object.keys(updateData[0]);

    captions.forEach((caption, index) => {
        columns.push({
            data: caption,
        });

        columnDefs.push({
            targets: index,
            title: captions[index]
        });

    });

    columnDefs[6].visible = false;

    return {
        data: updateData,
        columns,
        columnDefs,
        footer: [{'df': 2}],
        paging: false,
        retrieve: true,
        stateSave: true,
        initComplete: function () {
            const footer = $("<tfoot></tfoot>").appendTo("#example");
            const footertr = $("<tr></tr>").appendTo(footer);

            let elements = $();

            keys.forEach((key, index) => {
                if (index === 4) {
                    elements = elements.add('<td>' + select + '</td>');
                } else {
                    elements = elements.add('<td>' + key + '</td>');
                }
            });
            footertr.append(elements);

            $('select[name="query-select"]').on('change', function (e) {
                if (e.target.value === 'month') {
                    switchOptions(4, 6, 'month');
                }
                if (e.target.value === 'year') {
                    switchOptions(4, 4, 'year');
                }
            });

            const opt = `option[value=${selected}]`;
            $(opt).attr("selected", "selected");
        }

    }
}


let table = $('#example').DataTable(getOptoinTable(dataArr));

