$(function () {
  const $customSelects = $('.custom-select');

  if ($customSelects.length) {
    // 커스텀 위젯 정의
    $.widget('custom.iconselectmenu', $.ui.selectmenu, {
      _renderItem: function (ul, item) {
        const li = $('<li>');
        const wrapper = $('<div>', { text: item.label });

        if (item.disabled) li.addClass('ui-state-disabled');

        const iconClass = item.element.data('class');
        const iconStyle = item.element.attr('data-style'); // 스타일은 문자열 그대로 필요

        if (iconClass) {
          wrapper.prepend($('<span>', {
            class: `ui-icon ${iconClass}`,
            style: iconStyle,
          }));
        }

        return li.append(wrapper).appendTo(ul);
      }
    });

    // 초기화 및 클래스 동기화
    $customSelects.each(function () {
      const $originalSelect = $(this);
      const allClasses = $originalSelect.attr('class') || '';
      const extraClasses = allClasses
        .split(' ')
        .filter(c => c !== 'custom-select') // 기본 클래스 제외
        .join(' '); // ex: "size-lg"

      // 초기화
      $originalSelect
        .iconselectmenu({
          classes: {
            'ui-selectmenu-button': 'custom-select' // UI 버튼에 기본 클래스 추가
          }
        });

      // 버튼(wrapper)에 size-* 클래스도 함께 추가
      $originalSelect
        .iconselectmenu('widget') // 실제 버튼 영역
        .addClass(extraClasses);

      // 드롭다운 메뉴에도 클래스 추가
      $originalSelect
        .iconselectmenu('menuWidget')
        .addClass('custom-selectmenu-menu');
    });
  }
});

function lnbToggle() {
  $('.lnb').toggleClass('close');
}