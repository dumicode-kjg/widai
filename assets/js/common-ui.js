$(function () {
  // select
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
  // tooltip
  $("[data-geo]").tooltip({
    items: "[data-geo]", // 생략 가능하지만 명확하게 지정
    content: function () {
      var element = $(this);
      var targetSelector = element.data("geo");

      if (targetSelector) {
        var contentHtml = $(targetSelector).html();
        return contentHtml || "내용이 없습니다.";
      }

      return "잘못된 참조입니다.";
    },
    classes: {
      "ui-tooltip": "custom-tooltip"
    },
    track: false // 마우스를 따라다니지 않음
  });
  // dropdown
  $('.ui-dropdown').hide();

  $('.ui-dropper').each(function () {
    $(this)
      .button()
      .click(function (e) {
        e.preventDefault();

        var $this = $(this);
        var menuId = $this.data('drop');
        var $menu = $('#' + menuId);

        // 이미 보이고 있으면 (같은 버튼이면 닫기)
        if ($menu.is(':visible') && $menu.data('current') === this) {
          $menu.hide();
          $menu.removeData('current');
        } else {
          // 다른 버튼이 눌렸거나 안 보이고 있다면
          $('.ui-dropdown').not($menu).hide().removeData('current');

          $menu
            .data('current', this)
            .show()
            .position({
              my: 'right top',
              at: 'right bottom+4',
              of: this,
              collision: 'fit',
            });

          // 문서 클릭 시 드롭다운 닫기
          $(document)
            .off('click.uiDrop')
            .on('click.uiDrop', function (event) {
              if (
                !$(event.target).closest('.ui-dropper').length &&
                !$(event.target).closest('.ui-dropdown').length
              ) {
                $('.ui-dropdown').hide().removeData('current');
              }
            });
        }

        return false;
      });
  });




});

function lnbToggle() {
  $('.lnb').toggleClass('close');
}

function toggleAcc(btn, targetSelector) {
  $(btn).toggleClass('open');
  $(targetSelector).stop().slideToggle();
}

function viewFullText(btn, targetSelector) {
  $(btn).remove();
  $(targetSelector).addClass('view-full');
}

