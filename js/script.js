const dataArr = [
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
    },

    {
        "firstname":"Змей",
        "lastname":"Горыныч",
        "email":"test@test.com",
        "phonenumber":"33333333333",
        "birthday_contact":"1998-11-03",
        "company":"Company 4"
    }
];

let trigger ;
function addEvent () {
    const select = $('select[name="query-select"]');

    select.change(function (e) {
        if(e.target.value === 'months'){
            table.destroy();
            trigger = 'months';
            table = $('#example').DataTable(setDataToTable(dataArr));

        }
        if(e.target.value === 'year'){
            table.destroy();
            trigger = 'year';
            table = $('#example').DataTable(setDataToTable(dataArr));
        }
    });

}
function getYear(obj) {
    const index = obj.birthday_contact.indexOf('-');
    const year = obj.birthday_contact.slice(0, index);
    return year;
}

function getMonths(a) {
    const index = a.birthday_contact.indexOf('-');
    const secondIndex = a.birthday_contact.slice(index+1, a.birthday_contact.length).indexOf('-');
    const d = a.birthday_contact.slice(index+1, a.birthday_contact.length);
    const months = d.slice(0, secondIndex);
    return months;
}

function setDataToTable(data){
    const columns = [];
    const columnDefs = [];
    const updateData = data.map(obj=>{
        obj.year = getYear(obj);
        obj.months = getMonths(obj);
        return obj;
    });

    const captions = Object.keys(updateData[0]);

    captions.forEach((caption, index)=>{
        columns.push({
            data: caption
        });
        columnDefs.push({
            targets: index,
            title: captions[index]
        });

    });

    let query = 4;

    if(trigger === 'months'){
        console.log(columnDefs)
        query  = 7;
    }

    columnDefs.push({
        'orderData':[query],
        'targets': [4]
    } ,
    );



    columnDefs[7].visible = false;
    columnDefs[6].visible = false;

    return {
        data: updateData,
        columns,
        columnDefs,
        paging: false,
        order: [],
    }
}
addEvent();

let table = $('#example').DataTable(setDataToTable(dataArr));
