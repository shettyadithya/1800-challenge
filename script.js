// get the input from form
$(document).ready(function() {
  // craete dictionary of digit and charecter
  var dict = {
    0: ['0'],
    1: ['1'],
    2: ['A', 'B', 'C'],
    3: ['D', 'E', 'F'],
    4: ['G', 'H', 'I'],
    5: ['J', 'K', 'L'],
    6: ['M', 'N', 'O'],
    7: ['P', 'Q', 'R', 'S'],
    8: ['T', 'U', 'V'],
    9: ['W', 'X', 'Y', 'Z']
  };
  $('#btn').click(function() {
    let $test = $('#userNum').val();
    $getInput = inputValidate($test);
    if ($getInput) {
      let Replace = replaceNum($test, dict);
      let narray = Replace.first;
      let marray = Replace.second;
      let res = $.fn.myFunction();
      let dictAr = [].concat(...marray);
      let checkDict = valid(dictAr, res);
      if (checkDict.length == 0) {
        let consec_num = /\d{2}/;
        let newz = narray.join('');
        if (!consec_num.test(newz)) {
          $('#results').html(
            `1800-  ${narray
              .join('')
              .match(/.{1,3}/g)
              .join('-')}    
             <br />`
          );
        }
      } else {
        $('#results').html(`1800 - ${checkDict} `);

        // $('#results').html(
        //   ` 1800 - ${checkDict
        //     .join('')
        //     .match(/.{1,3}/g)
        //     .join('-')}`
        // );
        // let consec_num = /\d{2}/;
        // let newz = narray.join('');
        // if (!consec_num.test(newz)) {
        //   $('#results').html(
        //     `1800-  ${narray
        //       .join('')
        //       .match(/.{1,3}/g)
        //       .join('-')}
        //        <br />`
        //   );
        // }
        // alert('consecutive numericals are not allowed!s');
      }
    } else {
      alert('enter valid iinput');
    }
  });
  $('#dict_btn').click(
    ($.fn.myFunction = function() {
      let dict_val = $('#dictionary_Val').val();
      var dictz = [];
      dictz.push(dict_val.toUpperCase());
      return dictz;
    })
  );
});
//validate the input
function inputValidate(num) {
  let ignorePunctn = num.replace(/[^a-zA-Z0-9]/g, ' ');
  let numRegex = /^[0-9-]+$/;
  if (numRegex.test(ignorePunctn)) {
    return true;
  }
}
function replaceNum(test, dictObj) {
  let ars = Array.from(test);
  let charAr = [];
  let drray = [];
  for (var i = 0; i < ars.length; i++) {
    for (const key of Object.keys(dictObj)) {
      if (key == ars[i]) {
        charAr.push(dictObj[key][0]);
        drray.push(dictObj[key]);
      }
    }
  }                    
  return { first: charAr, second: drray };
}
// checking with dictionary
function valid(chars, dict) {
  var spellables = [];
  for (var j = 0; j < dict.length; ++j) {
    var map = {};
    for (var i = 0; i < chars.length; ++i) {
      if (map[chars[i]]) {
        map[chars[i]] += 1;
      } else {
        map[chars[i]] = 1;
      }
    }
    var bool = true;
    for (var k = 0; k < dict[j].length; ++k) {
      if (!map[dict[j].charAt(k)]) {
        bool = false;
        break;
      } else {
        map[dict[j].charAt(k)]--;
      }
    }
    if (bool) {
      spellables.push(dict[j]);
    }
  }
  return spellables;
}
