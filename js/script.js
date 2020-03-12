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
        "birthday_contact":"1998-05-03",
        "company":"Company 4"
    }
];

let selectedQuery ='';

function addEvent () {
    const select = $('select[name="query-select"]');

    select.change(function (e) {

       const callbakcMap =  {
            months:()=>{
                table.destroy();
                table = $('#example').DataTable(sortedByMonths(dataArr))
            },
            year: ()=>{
                table.destroy();
                table = $('#example').DataTable(sortedByYear(dataArr));
            }
        };

        callbakcMap[e.target.value]();
    });
}


function sortedByYear(data){
    function f(obj) {
        const index = obj.birthday_contact.indexOf('-');
        const year = obj.birthday_contact.slice(0, index);
        return year;
    }
    const sorted = [...data].sort((a, b)=> f(b) - f(a) );
    return setDataToTable(sorted);
}

function sortedByMonths(data) {

    function f(a) {
        const index = a.birthday_contact.indexOf('-');
        const secondIndex = a.birthday_contact.slice(index+1, a.birthday_contact.length).indexOf('-');
        const d = a.birthday_contact.slice(index+1, a.birthday_contact.length);
        const months = d.slice(0, secondIndex);
        return months;
    }
    const sorted = [...data].sort((a, b)=>f(b) - f(a));
    return setDataToTable(sorted);
}


function setDataToTable(data){
    const columns = [];
    const columnDefs = [];
    const captions = Object.keys(data[0]);

    captions.forEach((caption, index)=>{
        columns.push({
            data: caption
        });
        columnDefs.push({
            targets: index,
            title: captions[index]
        });

    });

    return {
        data,
        columns,
        columnDefs,
        paging: false,
        bSort: false,
    }
}
addEvent();

let table = $('#example').DataTable(setDataToTable(dataArr));
