// ����һ����ѯ��ťԪ��
var queryButton = document.createElement("button");
queryButton.textContent = "��ѯ";

// ����ѯ��ť��ӵ�ҳ���ϵľ���Ԫ���·�
var image = document.querySelector(".MuiBox-root .dChip");
image.parentElement.appendChild(queryButton);

// ע������ѯ��ť����¼�������
queryButton.addEventListener("click", function () {
  // �ڴ˴���Ӳ�ѯ�߼�����ʾ��ѯ����Ĵ���
});
console.log("���ز���ɹ�")