$.ajaxSetup({
  error (xhr, status, error) {
    $('.alert').removeClass('hidden')
    $('.alert').html('Status: ' + status + ', error: ' + error)
  }
})

function remove (event) {
  let $tr = findTr(event)
  let id = $tr.data('id');
  $.ajax({
    url: '/articles/' + id,
    type: 'DELETE',
    success (data, status, xhr) {
      $('.alert').addClass('hidden')
      $tr.remove()
    }
  })
}

function findTr (event) {
  let $target = $(event.target)
  return $target.parents('tr')
}

$(document).ready(() => {
  $('button.remove').on('click', remove)
})
