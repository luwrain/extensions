
class Frames {
    constructor(control){
	this.control = control;
	this.wizard = Luwrain.createWizardArea({
	    input: (event)=>this.onInput(event, control)
	});
	this.greeting().show();
	this.control.setLayout(this.wizard);
    }

    greeting(){
	return this.wizard.createFrame()
	    .addText("Создадим скрипт вашего первого приложения для LUWRAIN! Мастер, в котором вы сейчас находитесь, задаст несколько вопросов и составит его начальный текст. Используйте клавиши со стрелками для навигации и обращайте внимание на звуки. Элементы, которые являются кнопками, выделяются особым звуковым сигналом.")
	    .addInput("Имя приложения:", "Моё первое приложение")
	    .addClickable("Продолжить", ()=>{
		this.appType().show();
	    });
    }

    appType(){
	return this.wizard.createFrame()
	    .addText("Сейчас необходимо выбрать тип вашего приложения.")
	    .addClickable("Продолжить", ()=>{
		Luwrain.message("хаха");
	    });
    }

    onInput(event, control){
	if (event.code == "ESCAPE"){
	    control.close();
	    return true;
	}
	return false;
    }
}

Luwrain.launchApp(Frames);

