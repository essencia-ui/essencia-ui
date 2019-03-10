export default select = () => {
  let selects = $(".ess.select");
  $.each(selects, (index, select) => {
    let options = $(select).children();

    let ul = $('<ul>', {class: 'ess select-options', 'data-id': `${select.id}${(index + 13) * 25}`});
    let input = $('<input>', {class: 'ess rounded border-blue', type: 'text', style: 'width: 100%', id: ul.attr('data-id') })
    input.on('focus', () => {ul.css('display', 'block')})
    input.on('blur', () => {closeInput(ul)})

    for (let i = 0; i < options.length; i ++) {
      let li = $('<li>', {'data-value': options[i].value, id: `${ul.attr('data-id')}-${options[i].value}-${options[i].text}`});
      li.append(options[i].text);
      if(options[i].value) {
        li.on('click', () => {setInput(select, ul, input, li, options[i].text)});
      }
      ul.append(li);
    }
    $("<div>", {class: 'ess select-wrapper'}).insertAfter(select).append(select);
    ul.insertAfter(select);
    input.insertAfter(select);
    $("<div>").insertAfter(input);
    $(select).css('display', 'none');
  });

  function setInput(select, ul, input, elem, text) {
    input.val(text);
    $(select).val(elem.attr('data-value'));
  }

  function closeInput(ul) {
    
    setTimeout(() => {
      console.log(ul)
      $(ul).css('display', 'none');
    }, 200)
  }
}
