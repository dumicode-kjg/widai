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
  $('.ui-dropdown').menu().hide();
  $('.ui-dropper').each(function () {
    $(this)
      .button()
      .click(function (e) {
        e.preventDefault(); // 기본 이벤트 막기

        var $this = $(this);
        var menuId = $this.data('drop');
        var $menu = $('#' + menuId);

        // 다른 모든 드롭다운 메뉴 닫기
        $('.ui-menu:visible').not($menu).hide();

        // 해당 메뉴 toggle 및 위치 설정
        $menu.toggle().position({
          my: 'right top',
          at: 'right bottom+4',
          of: this,
          collision: 'fit', // 뷰포트 밖으로 나가지 않도록 보정
        });

        // 문서 클릭 시 드롭다운 닫기
        $(document).one('click', function () {
          $menu.hide();
        });

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