/**
 * 青云诗社 - 趣味诗词挑战
 * 小红书小工具优化版
 *
 * 特性：
 * - 完全离线运行，符合小红书小工具容器规范
 * - 内联诗词数据，无需网络请求
 * - 支持保存成绩图片到相册
 * - 支持发布笔记分享成绩
 */

// ============================================
// 诗词数据（内联，完全离线）
// ============================================
const POEMS_DATA = [
    {title: "静夜思", author: "李白", dynasty: "唐", content: "床前明月光，疑是地上霜。举头望明月，低头思故乡。"},
    {title: "将进酒", author: "李白", dynasty: "唐", content: "君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。"},
    {title: "望庐山瀑布", author: "李白", dynasty: "唐", content: "日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。"},
    {title: "早发白帝城", author: "李白", dynasty: "唐", content: "朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。"},
    {title: "春望", author: "杜甫", dynasty: "唐", content: "国破山河在，城春草木深。烽火连三月，家书抵万金。"},
    {title: "春夜喜雨", author: "杜甫", dynasty: "唐", content: "好雨知时节，当春乃发生。随风潜入夜，润物细无声。野径云俱黑，江船火独明。晓看红湿处，花重锦官城。"},
    {title: "登高", author: "杜甫", dynasty: "唐", content: "风急天高猿啸哀，渚清沙白鸟飞回。无边落木萧萧下，不尽长江滚滚来。"},
    {title: "望岳", author: "杜甫", dynasty: "唐", content: "岱宗夫如何，齐鲁青未了。造化钟神秀，阴阳割昏晓。荡胸生曾云，决眦入归鸟。会当凌绝顶，一览众山小。"},
    {title: "登鹳雀楼", author: "王之涣", dynasty: "唐", content: "白日依山尽，黄河入海流。欲穷千里目，更上一层楼。"},
    {title: "江雪", author: "柳宗元", dynasty: "唐", content: "千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。"},
    {title: "送元二使安西", author: "王维", dynasty: "唐", content: "渭城朝雨浥轻尘，客舍青青柳色新。劝君更尽一杯酒，西出阳关无故人。"},
    {title: "相思", author: "王维", dynasty: "唐", content: "红豆生南国，春来发几枝。愿君多采撷，此物最相思。"},
    {title: "九月九日忆山东兄弟", author: "王维", dynasty: "唐", content: "独在异乡为异客，每逢佳节倍思亲。遥知兄弟登高处，遍插茱萸少一人。"},
    {title: "凉州词", author: "王翰", dynasty: "唐", content: "葡萄美酒夜光杯，欲饮琵琶马上催。醉卧沙场君莫笑，古来征战几人回。"},
    {title: "出塞", author: "王昌龄", dynasty: "唐", content: "秦时明月汉时关，万里长征人未还。但使龙城飞将在，不教胡马度阴山。"},
    {title: "从军行", author: "王昌龄", dynasty: "唐", content: "青海长云暗雪山，孤城遥望玉门关。黄沙百战穿金甲，不破楼兰终不还。"},
    {title: "芙蓉楼送辛渐", author: "王昌龄", dynasty: "唐", content: "寒雨连江夜入吴，平明送客楚山孤。洛阳亲友如相问，一片冰心在玉壶。"},
    {title: "黄鹤楼送孟浩然之广陵", author: "李白", dynasty: "唐", content: "故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。"},
    {title: "赠汪伦", author: "李白", dynasty: "唐", content: "李白乘舟将欲行，忽闻岸上踏歌声。桃花潭水深千尺，不及汪伦送我情。"},
    {title: "行路难", author: "李白", dynasty: "唐", content: "金樽清酒斗十千，玉盘珍羞直万钱。长风破浪会有时，直挂云帆济沧海。"},
    {title: "蜀道难", author: "李白", dynasty: "唐", content: "噫吁嚱，危乎高哉。蜀道之难，难于上青天。"},
    {title: "关山月", author: "李白", dynasty: "唐", content: "明月出天山，苍茫云海间。长风几万里，吹度玉门关。"},
    {title: "客中行", author: "李白", dynasty: "唐", content: "兰陵美酒郁金香，玉碗盛来琥珀光。但使主人能醉客，不知何处是他乡。"},
    {title: "子夜吴歌", author: "李白", dynasty: "唐", content: "长安一片月，万户捣衣声。秋风吹不尽，总是玉关情。"},
    {title: "月下独酌", author: "李白", dynasty: "唐", content: "花间一壶酒，独酌无相亲。举杯邀明月，对影成三人。"},
    {title: "春晓", author: "孟浩然", dynasty: "唐", content: "春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。"},
    {title: "宿建德江", author: "孟浩然", dynasty: "唐", content: "移舟泊烟渚，日暮客愁新。野旷天低树，江清月近人。"},
    {title: "过故人庄", author: "孟浩然", dynasty: "唐", content: "故人具鸡黍，邀我至田家。绿树村边合，青山郭外斜。"},
    {title: "题破山寺后禅院", author: "常建", dynasty: "唐", content: "清晨入古寺，初日照高林。曲径通幽处，禅房花木深。山光悦鸟性，潭影空人心。"},
    {title: "题都城南庄", author: "崔护", dynasty: "唐", content: "去年今日此门中，人面桃花相映红。人面不知何处去，桃花依旧笑春风。"},
    {title: "游子吟", author: "孟郊", dynasty: "唐", content: "慈母手中线，游子身上衣。临行密密缝，意恐迟迟归。谁言寸草心，报得三春晖。"},
    {title: "枫桥夜泊", author: "张继", dynasty: "唐", content: "月落乌啼霜满天，江枫渔火对愁眠。姑苏城外寒山寺，夜半钟声到客船。"},
    {title: "滁州西涧", author: "韦应物", dynasty: "唐", content: "独怜幽草涧边生，上有黄鹂深树鸣。春潮带雨晚来急，野渡无人舟自横。"},
    {title: "寒食", author: "韩翃", dynasty: "唐", content: "春城无处不飞花，寒食东风御柳斜。日暮汉宫传蜡烛，轻烟散入五侯家。"},
    {title: "金缕衣", author: "杜秋娘", dynasty: "唐", content: "劝君莫惜金缕衣，劝君惜取少年时。花开堪折直须折，莫待无花空折枝。"},
    {title: "乌衣巷", author: "刘禹锡", dynasty: "唐", content: "朱雀桥边野草花，乌衣巷口夕阳斜。旧时王谢堂前燕，飞入寻常百姓家。"},
    {title: "酬乐天扬州初逢席上见赠", author: "刘禹锡", dynasty: "唐", content: "巴山楚水凄凉地，二十三年弃置身。怀旧空吟闻笛赋，到乡翻似烂柯人。沉舟侧畔千帆过，病树前头万木春。"},
    {title: "竹枝词", author: "刘禹锡", dynasty: "唐", content: "杨柳青青江水平，闻郎江上唱歌声。东边日出西边雨，道是无晴却有晴。"},
    {title: "赋得古原草送别", author: "白居易", dynasty: "唐", content: "离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。"},
    {title: "琵琶行", author: "白居易", dynasty: "唐", content: "浔阳江头夜送客，枫叶荻花秋瑟瑟。醉不成欢惨将别，别时茫茫江浸月。千呼万唤始出来，犹抱琵琶半遮面。转轴拨弦三两声，未成曲调先有情。大弦嘈嘈如急雨，小弦切切如私语。嘈嘈切切错杂弹，大珠小珠落玉盘。"},
    {title: "长恨歌", author: "白居易", dynasty: "唐", content: "汉皇重色思倾国，御宇多年求不得。杨家有女初长成，养在深闺人未识。天生丽质难自弃，一朝选在君王侧。回眸一笑百媚生，六宫粉黛无颜色。"},
    {title: "暮江吟", author: "白居易", dynasty: "唐", content: "一道残阳铺水中，半江瑟瑟半江红。可怜九月初三夜，露似真珠月似弓。"},
    {title: "忆江南", author: "白居易", dynasty: "唐", content: "江南好，风景旧曾谙。日出江花红胜火，春来江水绿如蓝。能不忆江南？"},
    {title: "问刘十九", author: "白居易", dynasty: "唐", content: "绿蚁新醅酒，红泥小火炉。晚来天欲雪，能饮一杯无？"},
    {title: "钱塘湖春行", author: "白居易", dynasty: "唐", content: "孤山寺北贾亭西，水面初平云脚低。几处早莺争暖树，谁家新燕啄春泥。乱花渐欲迷人眼，浅草才能没马蹄。"},
    {title: "江雪", author: "柳宗元", dynasty: "唐", content: "千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。"},
    {title: "逢雪宿芙蓉山主人", author: "刘长卿", dynasty: "唐", content: "日暮苍山远，天寒白屋贫。柴门闻犬吠，风雪夜归人。"},
    {title: "送灵澈上人", author: "刘长卿", dynasty: "唐", content: "苍苍竹林寺，杳杳钟声晚。荷笠带斜阳，青山独归远。"},
    {title: "秋夕", author: "杜牧", dynasty: "唐", content: "银烛秋光冷画屏，轻罗小扇扑流萤。天阶夜色凉如水，坐看牵牛织女星。"},
    {title: "清明", author: "杜牧", dynasty: "唐", content: "清明时节雨纷纷，路上行人欲断魂。借问酒家何处有，牧童遥指杏花村。"},
    {title: "山行", author: "杜牧", dynasty: "唐", content: "远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。"},
    {title: "泊秦淮", author: "杜牧", dynasty: "唐", content: "烟笼寒水月笼沙，夜泊秦淮近酒家。商女不知亡国恨，隔江犹唱后庭花。"},
    {title: "赤壁", author: "杜牧", dynasty: "唐", content: "折戟沉沙铁未销，自将磨洗认前朝。东风不与周郎便，铜雀春深锁二乔。"},
    {title: "锦瑟", author: "李商隐", dynasty: "唐", content: "锦瑟无端五十弦，一弦一柱思华年。庄生晓梦迷蝴蝶，望帝春心托杜鹃。沧海月明珠有泪，蓝田日暖玉生烟。此情可待成追忆，只是当时已惘然。"},
    {title: "无题", author: "李商隐", dynasty: "唐", content: "相见时难别亦难，东风无力百花残。春蚕到死丝方尽，蜡炬成灰泪始干。"},
    {title: "夜雨寄北", author: "李商隐", dynasty: "唐", content: "君问归期未有期，巴山夜雨涨秋池。何当共剪西窗烛，却话巴山夜雨时。"},
    {title: "嫦娥", author: "李商隐", dynasty: "唐", content: "云母屏风烛影深，长河渐落晓星沉。嫦娥应悔偷灵药，碧海青天夜夜心。"},
    {title: "贾生", author: "李商隐", dynasty: "唐", content: "宣室求贤访逐臣，贾生才调更无伦。可怜夜半虚前席，不问苍生问鬼神。"},
    {title: "登乐游原", author: "李商隐", dynasty: "唐", content: "向晚意不适，驱车登古原。夕阳无限好，只是近黄昏。"},
    {title: "南园十三首", author: "李贺", dynasty: "唐", content: "男儿何不带吴钩，收取关山五十州。请君暂上凌烟阁，若个书生万户侯？"},
    {title: "雁门太守行", author: "李贺", dynasty: "唐", content: "黑云压城城欲摧，甲光向日金鳞开。角声满天秋色里，塞上燕脂凝夜紫。"},
    {title: "马诗", author: "李贺", dynasty: "唐", content: "大漠沙如雪，燕山月似钩。何当金络脑，快走踏清秋。"},
    {title: "江南春", author: "杜牧", dynasty: "唐", content: "千里莺啼绿映红，水村山郭酒旗风。南朝四百八十寺，多少楼台烟雨中。"},
    {title: "题乌江亭", author: "杜牧", dynasty: "唐", content: "胜败兵家事不期，包羞忍耻是男儿。江东子弟多才俊，卷土重来未可知。"},
    {title: "金谷园", author: "杜牧", dynasty: "唐", content: "繁华事散逐香尘，流水无情草自春。日暮东风怨啼鸟，落花犹似坠楼人。"},
    {title: "近试上张水部", author: "朱庆馀", dynasty: "唐", content: "洞房昨夜停红烛，待晓堂前拜舅姑。妆罢低声问夫婿，画眉深浅入时无？"},
    {title: "回乡偶书", author: "贺知章", dynasty: "唐", content: "少小离家老大回，乡音无改鬓毛衰。儿童相见不相识，笑问客从何处来。"},
    {title: "咏柳", author: "贺知章", dynasty: "唐", content: "碧玉妆成一树高，万条垂下绿丝绦。不知细叶谁裁出，二月春风似剪刀。"},
    {title: "登金陵凤凰台", author: "李白", dynasty: "唐", content: "凤凰台上凤凰游，凤去台空江自流。吴宫花草埋幽径，晋代衣冠成古丘。三山半落青天外，二水中分白鹭洲。总为浮云能蔽日，长安不见使人愁。"},
    {title: "宣州谢朓楼饯别校书叔云", author: "李白", dynasty: "唐", content: "弃我去者，昨日之日不可留。乱我心者，今日之日多烦忧。长风万里送秋雁，对此可以酣高楼。蓬莱文章建安骨，中间小谢又清发。俱怀逸兴壮思飞，欲上青天揽明月。抽刀断水水更流，举杯消愁愁更愁。人生在世不称意，明朝散发弄扁舟。"},
    {title: "夜宿山寺", author: "李白", dynasty: "唐", content: "危楼高百尺，手可摘星辰。不敢高声语，恐惊天上人。"},
    {title: "独坐敬亭山", author: "李白", dynasty: "唐", content: "众鸟高飞尽，孤云独去闲。相看两不厌，只有敬亭山。"},
    {title: "秋浦歌", author: "李白", dynasty: "唐", content: "白发三千丈，缘愁似个长。不知明镜里，何处得秋霜。"},
    {title: "玉阶怨", author: "李白", dynasty: "唐", content: "玉阶生白露，夜久侵罗袜。却下水晶帘，玲珑望秋月。"},
    {title: "怨情", author: "李白", dynasty: "唐", content: "美人卷珠帘，独坐颦蛾眉。但见泪痕湿，不知心恨谁。"},
    {title: "听筝", author: "李端", dynasty: "唐", content: "鸣筝金粟柱，素手玉房前。欲得周郎顾，时时误拂弦。"},
    {title: "新嫁娘词", author: "王建", dynasty: "唐", content: "三日入厨下，洗手作羹汤。未谙姑食性，先遣小姑尝。"},
    {title: "雨过山村", author: "王建", dynasty: "唐", content: "雨里鸡鸣一两家，竹溪村路板桥斜。妇姑相唤浴蚕去，闲看中庭栀子花。"},
    {title: "十五夜望月", author: "王建", dynasty: "唐", content: "中庭地白树栖鸦，冷露无声湿桂花。今夜月明人尽望，不知秋思落谁家。"},
    {title: "江畔独步寻花", author: "杜甫", dynasty: "唐", content: "黄四娘家花满蹊，千朵万朵压枝低。留连戏蝶时时舞，自在娇莺恰恰啼。"},
    {title: "绝句", author: "杜甫", dynasty: "唐", content: "两个黄鹂鸣翠柳，一行白鹭上青天。窗含西岭千秋雪，门泊东吴万里船。"},
    {title: "绝句", author: "杜甫", dynasty: "唐", content: "迟日江山丽，春风花草香。泥融飞燕子，沙暖睡鸳鸯。"},
    {title: "江南逢李龟年", author: "杜甫", dynasty: "唐", content: "岐王宅里寻常见，崔九堂前几度闻。正是江南好风景，落花时节又逢君。"},
    {title: "赠花卿", author: "杜甫", dynasty: "唐", content: "锦城丝管日纷纷，半入江风半入云。此曲只应天上有，人间能得几回闻？"},
    {title: "闻官军收河南河北", author: "杜甫", dynasty: "唐", content: "剑外忽传收蓟北，初闻涕泪满衣裳。却看妻子愁何在，漫卷诗书喜欲狂。白日放歌须纵酒，青春作伴好还乡。即从巴峡穿巫峡，便下襄阳向洛阳。"},
    {title: "旅夜书怀", author: "杜甫", dynasty: "唐", content: "细草微风岸，危樯独夜舟。星垂平野阔，月涌大江流。名岂文章著，官应老病休。飘飘何所似，天地一沙鸥。"},
    {title: "登楼", author: "杜甫", dynasty: "唐", content: "花近高楼伤客心，万方多难此登临。锦江春色来天地，玉垒浮云变古今。北极朝廷终不改，西山寇盗莫相侵。可怜后主还祠庙，日暮聊为梁父吟。"},
    {title: "蜀相", author: "杜甫", dynasty: "唐", content: "丞相祠堂何处寻，锦官城外柏森森。映阶碧草自春色，隔叶黄鹂空好音。三顾频烦天下计，两朝开济老臣心。出师未捷身先死，长使英雄泪满襟。"},
    {title: "客至", author: "杜甫", dynasty: "唐", content: "舍南舍北皆春水，但见群鸥日日来。花径不曾缘客扫，蓬门今始为君开。盘飧市远无兼味，樽酒家贫只旧醅。肯与邻翁相对饮，隔篱呼取尽余杯。"},
    {title: "八阵图", author: "杜甫", dynasty: "唐", content: "功盖三分国，名成八阵图。江流石不转，遗恨失吞吴。"},
    {title: "咏怀古迹", author: "杜甫", dynasty: "唐", content: "群山万壑赴荆门，生长明妃尚有村。一去紫台连朔漠，独留青冢向黄昏。"},
    {title: "春日忆李白", author: "杜甫", dynasty: "唐", content: "白也诗无敌，飘零尔独行。庾信文章老更成，凌云健笔意纵横。"},
    {title: "天末怀李白", author: "杜甫", dynasty: "唐", content: "凉风起天末，君子意久留。鸿雁几时到，江湖秋水多。文章憎命达，魑魅喜人过。应共冤魂语，投诗赠汨罗。"},
    {title: "月夜忆舍弟", author: "杜甫", dynasty: "唐", content: "戍鼓断人行，边秋一雁声。露从今夜白，月是故乡明。有弟皆分散，无家问死生。寄书长不达，况乃未休兵。"},
    {title: "日暮", author: "杜甫", dynasty: "唐", content: "牛羊下来久，各已闭柴门。风月自清夜，江山非故园。石泉流暗壁，草露滴秋根。"},
    {title: "水槛遣心", author: "杜甫", dynasty: "唐", content: "去郭轩楹敞，无村眺望赊。澄江平少岸，幽树晚多花。细雨鱼儿出，微风燕子斜。城中十万户，此地两三家。"},
    {title: "题三闾大夫庙", author: "褚载", dynasty: "唐", content: "苍黄古庙水悠悠，天寒日暮江流。何处招魂香还在，汨罗江上楚人愁。"},
    {title: "嫦娥", author: "李商隐", dynasty: "唐", content: "云母屏风烛影深，长河渐落晓星沉。嫦娥应悔偷灵药，碧海青天夜夜心。"},
    {title: "忆梅", author: "李商隐", dynasty: "唐", content: "定定住天涯，依依向物华。寒梅最堪恨，长作去年花。"},
    {title: "忆住一师", author: "李商隐", dynasty: "唐", content: "无事经年别远公，帝城钟信忆云峰。炉烟消尽寒灯晦，童子开门雪满松。"},
    {title: "北青萝", author: "李商隐", dynasty: "唐", content: "残阳西入崦，茅屋访孤僧。落叶人何在，寒云路几层。独敲初夜磬，闲倚一枝藤。世界微尘里，吾宁爱与憎。"},
    {title: "送崔珙往西川", author: "李商隐", dynasty: "唐", content: "卜兆至此近，此时生菰芦。梁山感楚梦，巫峡泣秦珠。"},
    {title: "野望", author: "王绩", dynasty: "唐", content: "东皋薄暮望，徙倚欲何依。树树皆秋色，山山唯落晖。牧人驱犊返，猎马带禽归。相顾无相识，长歌怀采薇。"},
    {title: "咏鹅", author: "骆宾王", dynasty: "唐", content: "鹅，鹅，鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"},
    {title: "于易水送人", author: "骆宾王", dynasty: "唐", content: "此地别燕丹，壮士发冲冠。昔时人已没，今日水犹寒。"},
    {title: "在狱咏蝉", author: "骆宾王", dynasty: "唐", content: "西陆蝉声唱，南冠客思侵。那堪玄鬓影，来对白头吟。露重飞难进，风多响易沉。无人信高洁，谁为表予心？"},
    {title: "渡汉江", author: "宋之问", dynasty: "唐", content: "岭外音书断，经冬复历春。近乡情更怯，不敢问来人。"},
    {title: "渡湘江", author: "杜审言", dynasty: "唐", content: "迟日园林悲昔游，今春花鸟作边愁。独怜京国人南窜，不似湘江水北流。"},
    {title: "和晋陵陆丞早春游望", author: "杜审言", dynasty: "唐", content: "独有宦游人，偏惊物候新。云霞出海曙，梅柳渡江春。淑气催黄鸟，晴光转绿蘋。忽闻歌古调，归思欲沾巾。"},
    {title: "苏武庙", author: "温庭筠", dynasty: "唐", content: "苏武魂销汉使前，古祠高树两茫然。云边雁断胡天月，陇上羊归塞草烟。"},
    {title: "商山早行", author: "温庭筠", dynasty: "唐", content: "晨起动征铎，客行悲故乡。鸡声茅店月，人迹板桥霜。槲叶落山路，枳花明驿墙。因思杜陵梦，凫雁满回塘。"},
    {title: "望江南", author: "温庭筠", dynasty: "唐", content: "梳洗罢，独倚望江楼。过尽千帆皆不是，斜晖脉脉水悠悠。肠断白蘋洲。"},
    {title: "更漏子", author: "温庭筠", dynasty: "唐", content: "玉炉香，红蜡泪，偏照画堂秋思。眉翠薄，鬓云残，夜长衾枕寒。梧桐树，三更雨，不道离情正苦。一叶叶，一声声，空阶滴到明。"},
    {title: "菩萨蛮", author: "温庭筠", dynasty: "唐", content: "小山重叠金明灭，鬓云欲度香腮雪。懒起画蛾眉，弄妆梳洗迟。照花前后镜，花面交相映。新帖绣罗襦，双双金鹧鸪。"},
    {title: "瑶瑟怨", author: "温庭筠", dynasty: "唐", content: "冰簟银床梦不成，碧天如水夜云轻。雁声远过潇湘去，十二楼中月自明。"},
    {title: "陇西行", author: "陈陶", dynasty: "唐", content: "誓扫匈奴不顾身，五千貂锦丧胡尘。可怜无定河边骨，犹是春闺梦里人。"},
    {title: "陇上行", author: "王维", dynasty: "唐", content: "十里一走马，五里一扬鞭。都护军书至，匈奴围酒泉。关山正飞雪，烽火断无烟。"},
    {title: "老将行", author: "王维", dynasty: "唐", content: "少年十五二十时，步行夺得胡马骑。射杀中山白额虎，肯数邺下黄须儿。"},
    {title: "桃源行", author: "王维", dynasty: "唐", content: "渔舟逐水爱山春，两岸桃花夹古津。坐看红树不知远，行尽青溪不见人。"},
    {title: "夷陵歌", author: "王维", dynasty: "唐", content: "南山自多晦，云雨昼冥冥。秋风楚竹响，夜雨巫峡灵。"},
    {title: "酌酒与裴迪", author: "王维", dynasty: "唐", content: "酌酒与君君自宽，人情翻覆似波澜。白首相知犹按剑，朱门先达笑弹冠。"},
    {title: "杂诗", author: "王维", dynasty: "唐", content: "君自故乡来，应知故乡事。来日绮窗前，寒梅著花未？"},
    {title: "山居秋暝", author: "王维", dynasty: "唐", content: "空山新雨后，天气晚来秋。明月松间照，清泉石上流。竹喧归浣女，莲动下渔舟。随意春芳歇，王孙自可留。"},
    {title: "终南别业", author: "王维", dynasty: "唐", content: "中岁颇好道，晚家南山陲。兴来每独往，胜事空自知。行到水穷处，坐看云起时。偶然值林叟，谈笑无还期。"},
    {title: "积雨辋川庄作", author: "王维", dynasty: "唐", content: "积雨空林烟火迟，蒸藜炊黍饷东菑。漠漠水田飞白鹭，阴阴夏木啭黄鹂。"},
    {title: "鹿柴", author: "王维", dynasty: "唐", content: "空山不见人，但闻人语响。返景入深林，复照青苔上。"},
    {title: "竹里馆", author: "王维", dynasty: "唐", content: "独坐幽篁里，弹琴复长啸。深林人不知，明月来相照。"},
    {title: "木兰辞", author: "佚名", dynasty: "北朝", content: "唧唧复唧唧，木兰当户织。不闻机杼声，唯闻女叹息。问女何所思，问女何所忆。女亦无所思，女亦无所忆。昨夜见军帖，可汗大点兵，军书十二卷，卷卷有爷名。阿爷无大儿，木兰无长兄，愿为市鞍马，从此替爷征。"},
    {title: "敕勒歌", author: "佚名", dynasty: "北朝", content: "敕勒川，阴山下。天似穹庐，笼盖四野。天苍苍，野茫茫。风吹草低见牛羊。"},
    {title: "饮马长城窟行", author: "蔡文姬", dynasty: "汉", content: "青青河畔草，绵绵思远道。远道不可思，宿昔梦见之。梦见在我傍，忽觉在他乡。"},
    {title: "短歌行", author: "曹操", dynasty: "汉", content: "对酒当歌，人生几何！譬如朝露，去日苦多。慨当以慷，忧思难忘。何以解忧？唯有杜康。"},
    {title: "观沧海", author: "曹操", dynasty: "汉", content: "东临碣石，以观沧海。水何澹澹，山岛竦峙。树木丛生，百草丰茂。秋风萧瑟，洪波涌起。日月之行，若出其中。星汉灿烂，若出其里。"},
    {title: "龟媚寿", author: "曹操", dynasty: "汉", content: "神龟虽寿，犹有竟时。螣蛇乘雾，终为土灰。老骥伏枥，志在千里。烈士暮年，壮心不已。"},
    {title: "七步诗", author: "曹植", dynasty: "汉", content: "煮豆持作羹，漉菽以为汁。萁在釜下燃，豆在釜中泣。本是同根生，相煎何太急？"},
    {title: "归园田居", author: "陶渊明", dynasty: "晋", content: "少无适俗韵，性本爱丘山。误落尘网中，一去三十年。羁鸟恋旧林，池鱼思故渊。开荒南野际，守拙归园田。方宅十余亩，草屋八九间。榆柳荫后檐，桃李罗堂前。暧暧远人村，依依墟里烟。狗吠深巷中，鸡鸣桑树颠。户庭无尘杂，虚室有余闲。久在樊笼里，复得返自然。"},
    {title: "饮酒", author: "陶渊明", dynasty: "晋", content: "结庐在人境，而无车马喧。问君何能尔？心远地自偏。采菊东篱下，悠然见南山。山气日夕佳，飞鸟相与还。此中有真意，欲辨已忘言。"},
    {title: "桃花源记", author: "陶渊明", dynasty: "晋", content: "晋太元中，武陵人捕鱼为业。缘溪行，忘路之远近。忽逢桃花林，夹岸数百步，中无杂树，芳草鲜美，落英缤纷。"},
    {title: "归去来兮辞", author: "陶渊明", dynasty: "晋", content: "归去来兮，田园将芜胡不归？既自以心为形役，奚惆怅而独悲？悟已往之不谏，知来者之可追。"},
    {title: "五柳先生传", author: "陶渊明", dynasty: "晋", content: "先生不知何许人也，亦不详其姓字，宅边有五柳树，因以为号焉。闲静少言，不慕荣利。"},
    {title: "咏荆轲", author: "陶渊明", dynasty: "晋", content: "燕丹善养士，志在报强赢。招集百夫良，岁暮得荆卿。雄发指危冠，猛气冲长缨。饮饯易水上，四座列群英。"},
    {title: "读山海经", author: "陶渊明", dynasty: "晋", content: "精卫衔微木，将以填沧海。刑天舞干戚，猛志固常在。同物既无虑，化去不复悔。徒设在昔心，良辰讵可待。"},
    {title: "挽歌", author: "陶渊明", dynasty: "晋", content: "亲戚或余悲，他人亦已歌。死去何所道，托体同山阿。"},
    {title: "责子", author: "陶渊明", dynasty: "晋", content: "雍端年十三，不识六与七。通子垂九龄，但觅梨与栗。"},
    {title: "示周续之祖企谢景夷三郎", author: "陶渊明", dynasty: "晋", content: "负痾颓檐下，终日无一欣。药石有时闲，我岂知远近。"},
    {title: "乞食", author: "陶渊明", dynasty: "晋", content: "饥来驱我去，不知竟何之。行行至斯里，叩门拙言辞。"},
    {title: "游斜川", author: "陶渊明", dynasty: "晋", content: "开岁倏五十，吾生行归休。念之动中怀，及辰为兹游。"},
    {title: "九日闲居", author: "陶渊明", dynasty: "晋", content: "世短意恒多，斯人乐久生。日月依辰至，举俗爱其名。"},
    {title: "归鸟", author: "陶渊明", dynasty: "晋", content: "翼翼归鸟，晨去于林。远之八表，近憩云岑。和风弗洽，翮翮未寻。顾俦相鸣，景庇清阴。"},
    {title: "水调歌头", author: "苏轼", dynasty: "宋", content: "明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。"},
    {title: "念奴娇", author: "苏轼", dynasty: "宋", content: "大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间，樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。"},
    {title: "江城子", author: "苏轼", dynasty: "宋", content: "老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。酒酣胸胆尚开张，鬓微霜，又何妨！持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。"},
    {title: "江城子", author: "苏轼", dynasty: "宋", content: "十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，唯有泪千行。料得年年肠断处，明月夜，短松冈。"},
    {title: "定风波", author: "苏轼", dynasty: "宋", content: "莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。"},
    {title: "青玉案", author: "辛弃疾", dynasty: "宋", content: "东风夜放花千树，更吹落，星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。"},
    {title: "永遇乐", author: "辛弃疾", dynasty: "宋", content: "千古江山，英雄无觅，孙仲谋处。舞榭歌台，风流总被，雨打风吹去。斜阳草树，寻常巷陌，人道寄奴曾住。想当年，金戈铁马，气吞万里如虎。元嘉草草，封狼居胥，赢得仓皇北顾。四十三年，望中犹记，烽火扬州路。可堪回首，佛狸祠下，一片神鸦社鼓。凭谁问，廉颇老矣，尚能饭否？"},
    {title: "破阵子", author: "辛弃疾", dynasty: "宋", content: "醉里挑灯看剑，梦回吹角连营。八百里分麾下炙，五十弦翻塞外声。沙场秋点兵。马作的卢飞快，弓如霹雳弦惊。了却君王天下事，赢得生前身后名。可怜白发生！"},
    {title: "西江月", author: "辛弃疾", dynasty: "宋", content: "明月别枝惊鹊，清风半夜鸣蝉。稻花香里说丰年，听取蛙声一片。七八个星天外，两三点雨山前。旧时茅店社林边，路转溪桥忽见。"},
    {title: "丑奴儿", author: "辛弃疾", dynasty: "宋", content: "少年不识愁滋味，爱上层楼。爱上层楼，为赋新词强说愁。而今识尽愁滋味，欲说还休。欲说还休，却道天凉好个秋。"},
    {title: "南乡子", author: "辛弃疾", dynasty: "宋", content: "何处望神州？满眼风光北固楼。千古兴亡多少事？悠悠。不尽长江滚滚流。"},
    {title: "清平乐", author: "辛弃疾", dynasty: "宋", content: "茅檐低小，溪上青青草。醉里吴音相媚好，白发谁家翁媪。大儿锄豆溪东，中儿正织鸡笼。最喜小儿亡赖，溪头卧剥莲蓬。"},
    {title: "声声慢", author: "李清照", dynasty: "宋", content: "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急？雁过也，正伤心，却是旧时相识。满地黄花堆积。憔悴损，如今有谁堪摘？守着窗儿，独自怎生得黑？梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个愁字了得！"},
    {title: "一剪梅", author: "李清照", dynasty: "宋", content: "红藕香残玉簟秋。轻解罗裳，独上兰舟。云中谁寄锦书来？雁字回时，月满西楼。花自飘零水自流。一种相思，两处闲愁。此情无计可消除，才下眉头，却上心头。"},
    {title: "如梦令", author: "李清照", dynasty: "宋", content: "常记溪亭日暮，沉醉不知归路。兴尽晚回舟，误入藕花深处。争渡，争渡，惊起一滩鸥鹭。"},
    {title: "如梦令", author: "李清照", dynasty: "宋", content: "昨夜雨疏风骤，浓睡不消残酒。试问卷帘人，却道海棠依旧。知否，知否？应是绿肥红瘦。"},
    {title: "醉花阴", author: "李清照", dynasty: "宋", content: "薄雾浓云愁永昼，瑞脑消金兽。佳节又重阳，玉枕纱橱，半夜凉初透。东篱把酒黄昏后，有暗香盈袖。莫道不消魂，帘卷西风，人比黄花瘦。"},
    {title: "武陵春", author: "李清照", dynasty: "宋", content: "风住尘香花已尽，日晚倦梳头。物是人非事事休，欲语泪先流。闻说双溪春尚好，也拟泛轻舟。只恐双溪舴艋舟，载不动许多愁。"},
    {title: "渔家傲", author: "范仲淹", dynasty: "宋", content: "塞下秋来风景异，衡阳雁去无留意。四面边声连角起。千嶂里，长烟落日孤城闭。浊酒一杯家万里，燕然未勒归无计。羌管悠悠霜满地。人不寐，将军白发征夫泪。"},
    {title: "苏幕遮", author: "范仲淹", dynasty: "宋", content: "碧云天，黄叶地，秋色连波，波上寒烟翠。山映斜阳天接水，芳草无情，更在斜阳外。黯乡魂，追旅思，夜夜除非，好梦留人睡。明月高楼休独倚，酒入愁肠，化作相思泪。"},
    {title: "岳阳楼记", author: "范仲淹", dynasty: "宋", content: "庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废俱兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上。属予作文以记之。"},
    {title: "蝶恋花", author: "欧阳修", dynasty: "宋", content: "庭院深深深几许，杨柳堆烟，帘幕无重数。玉勒雕鞍游冶处，楼高不见章台路。雨横风狂三月暮，门掩黄昏，无计留春住。泪眼问花花不语，乱红飞过秋千去。"},
    {title: "生查子", author: "欧阳修", dynasty: "宋", content: "去年元夜时，花市灯如昼。月上柳梢头，人约黄昏后。今年元夜时，月与灯依旧。不见去年人，泪湿春衫袖。"},
    {title: "浪淘沙", author: "欧阳修", dynasty: "宋", content: "把酒祝东风，且共从容。垂杨紫陌洛城东。总是当时携手处，游遍芳丛。聚散苦匆匆，此恨无穷。今年花胜去年红。可惜明年花更好，知与谁同？"},
    {title: "鹊桥仙", author: "秦观", dynasty: "宋", content: "纤云弄巧，飞星传恨，银汉迢迢暗度。金风玉露一相逢，便胜却人间无数。柔情似水，佳期如梦，忍顾鹊桥归路。两情若是久长时，又岂在朝朝暮暮。"},
    {title: "浣溪沙", author: "晏殊", dynasty: "宋", content: "一曲新词酒一杯，去年天气旧亭台。夕阳西下几时回？无可奈何花落去，似曾相识燕归来。小园香径独徘徊。"},
    {title: "玉楼春", author: "宋祁", dynasty: "宋", content: "东城渐觉风光好，縠皱波纹迎客棹。绿杨烟外晓寒轻，红杏枝头春意闹。浮生长恨欢娱少，肯爱千金轻一笑。为君持酒劝斜阳，且向花间留晚照。"},
    {title: "八声甘州", author: "柳永", dynasty: "宋", content: "对潇潇暮雨洒江天，一番洗清秋。渐霜风凄紧，关河冷落，残照当楼。是处红衰翠减，苒苒物华休。惟有长江水，无语东流。"},
    {title: "虞美人", author: "李煜", dynasty: "五代", content: "春花秋月何时了？往事知多少。小楼昨夜又东风，故国不堪回首月明中。雕栏玉砌应犹在，只是朱颜改。问君能有几多愁？恰似一江春水向东流。"},
    {title: "相见欢", author: "李煜", dynasty: "五代", content: "无言独上西楼，月如钩。寂寞梧桐深院锁清秋。剪不断，理还乱，是离愁。别是一般滋味在心头。"},
    {title: "浪淘沙", author: "李煜", dynasty: "五代", content: "帘外雨潺潺，春意阑珊。罗衾不耐五更寒。梦里不知身是客，一晌贪欢。独自莫凭栏，无限江山，别时容易见时难。流水落花春去也，天上人间。"},
    {title: "望江南", author: "李煜", dynasty: "五代", content: "闲梦远，南国正清秋。千里江山寒色远，芦花深处泊孤舟。笛在月明楼。"},
    {title: "菩萨蛮", author: "李煜", dynasty: "五代", content: "花明月暗笼轻雾，今宵好向郎边去。划袜步香阶，手提金缕鞋。"},
    {title: "长相思", author: "李煜", dynasty: "五代", content: "一重山，两重山，山远天高烟水寒，相思枫叶丹。"},
    {title: "忆秦娥", author: "李白", dynasty: "唐", content: "箫声咽，秦娥梦断秦楼月。秦楼月，年年柳色，灞陵伤别。乐游原上清秋节，咸阳古道音尘绝。音尘绝，西风残照，汉家陵阙。"},
    {title: "渔歌子", author: "张志和", dynasty: "唐", content: "西塞山前白鹭飞，桃花流水鳜鱼肥。青箬笠，绿蓑衣，斜风细雨不须归。"}
];

// ============================================
// 游戏状态
// ============================================
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;          // 积分
let stars = 0;          // 星星
let combo = 0;
let maxCombo = 0;
let correctCount = 0;
let sessionScore = 0;
let sessionStars = 0;
let consecutiveWrongs = 0;
let currentGrade = null;

// ============================================
// 趣味问题生成器
// ============================================
function generateQuestion(poem) {
    const questionTypes = ['fillBlank', 'author', 'title', 'nextLine'];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    switch(type) {
        case 'fillBlank':
            return generateFillBlank(poem);
        case 'author':
            return generateAuthorQuestion(poem);
        case 'title':
            return generateTitleQuestion(poem);
        case 'nextLine':
            return generateNextLineQuestion(poem);
    }
}

function generateFillBlank(poem) {
    const lines = poem.content.split(/[，。！？、]/).filter(l => l.trim().length > 2);
    if (lines.length < 2) {
        return generateAuthorQuestion(poem);
    }
    const line = lines[Math.floor(Math.random() * (lines.length - 1))];
    const next = getNextLine(poem.content, line);
    if (!next) {
        return generateAuthorQuestion(poem);
    }
    return {
        poem: poem,
        type: 'fillBlank',
        question: `"${line}"的下一句是什么？`,
        correct: next,
        options: generateOptions(next, 'line')
    };
}

function generateAuthorQuestion(poem) {
    const memes = [
        `这首诗的作者是谁？`,
        `谁写的这首诗？提示：${poem.dynasty}代诗人`,
        `请选出《${poem.title}》的作者`,
        `${poem.dynasty}代诗人，这首是谁的作品？`
    ];
    const wrongAuthors = getWrongAuthors(poem.author, poem.dynasty);
    return {
        poem: poem,
        type: 'author',
        question: memes[Math.floor(Math.random() * memes.length)],
        correct: poem.author,
        options: generateOptions(poem.author, 'author', wrongAuthors)
    };
}

function generateTitleQuestion(poem) {
    const preview = poem.content.substring(0, Math.min(15, poem.content.length));
    return {
        poem: poem,
        type: 'title',
        question: `这首诗叫什么名字？提示：${preview}...`,
        correct: poem.title,
        options: generateOptions(poem.title, 'title')
    };
}

function generateNextLineQuestion(poem) {
    const sentences = poem.content.split(/[，。]/).filter(s => s.trim().length > 2);
    if (sentences.length < 2) {
        return generateAuthorQuestion(poem);
    }
    const randomIndex = Math.floor(Math.random() * (sentences.length - 1));
    return {
        poem: poem,
        type: 'nextLine',
        question: `"${sentences[randomIndex]}"的下一句是？`,
        correct: sentences[randomIndex + 1] || sentences[0],
        options: generateOptions(sentences[randomIndex + 1] || sentences[0], 'line')
    };
}

function getNextLine(content, line) {
    const parts = content.split(/[，。]/);
    const index = parts.indexOf(line);
    if (index >= 0 && index < parts.length - 1) {
        return parts[index + 1].trim();
    }
    return null;
}

function getWrongAuthors(correctAuthor, dynasty) {
    const authorsByDynasty = {
        '唐': ['李白', '杜甫', '王维', '白居易', '杜牧', '李商隐', '孟浩然', '王之涣', '刘禹锡', '贺知章'],
        '宋': ['苏轼', '辛弃疾', '李清照', '柳永', '陆游', '欧阳修', '秦观', '范仲淹', '晏殊'],
        '五代': ['李煜'],
        '晋': ['陶渊明'],
        '汉': ['曹操', '曹植', '蔡文姬'],
        '北朝': ['佚名']
    };
    const authors = authorsByDynasty[dynasty] || authorsByDynasty['唐'];
    return shuffleArray(authors.filter(a => a !== correctAuthor)).slice(0, 3);
}

function generateOptions(correct, type, extras = []) {
    let options = [correct];

    if (type === 'author' && extras.length > 0) {
        options = [...options, ...extras];
    } else if (type === 'line') {
        const wrongOptions = [
            '人生自古谁无死',
            '一蓑烟雨任平生',
            '春风又绿江南岸',
            '轻舟已过万重山',
            '曾经沧海难为水'
        ];
        options = [...options, ...shuffleArray(wrongOptions).slice(0, 3)];
    } else if (type === 'title') {
        const wrongTitles = ['无题', '绝句', '遣怀', '杂诗', '偶成'];
        options = [...options, ...shuffleArray(wrongTitles).slice(0, 3)];
    } else {
        options = [...options, ...extras];
    }

    while (options.length < 4) {
        options.push(`选项${options.length + 1}`);
    }

    return shuffleArray(options.slice(0, 4));
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ============================================
// 鼓励数据
// ============================================
const encourageData = {
    mild: [
        { emoji: '💪', text: '加油，再接再厉！' },
        { emoji: '📚', text: '多积累，下次一定对！' },
        { emoji: '✨', text: '继续努力，你可以的！' },
        { emoji: '🌱', text: '学习是一个过程，加油！' },
        { emoji: '📖', text: '多读诗词，必有收获！' },
        { emoji: '🎯', text: '瞄准正确答案，继续前进！' },
        { emoji: '🌟', text: '不灰心，继续挑战！' },
        { emoji: '📝', text: '积累知识，下次必对！' },
        { emoji: '🔍', text: '仔细思考，你能行！' },
        { emoji: '💡', text: '这道题有点难，继续学！' }
    ],
    medium: [
        { emoji: '🎓', text: '这道题确实有难度' },
        { emoji: '📚', text: '诗词之路，继续前行' },
        { emoji: '✨', text: '每次错误都是进步' },
        { emoji: '💪', text: '不要气馁，继续努力' },
        { emoji: '🌱', text: '今天不会，明天就会！' }
    ],
    heavy: [
        { emoji: '📖', text: '古诗词博大精深' },
        { emoji: '🎯', text: '继续学习，必有进步' },
        { emoji: '✨', text: '加油，你会越来越强' },
        { emoji: '🌟', text: '学习之路，坚持不懈' },
        { emoji: '💪', text: '每一题都是积累！' }
    ]
};

function getRandomEncourage() {
    consecutiveWrongs++;
    let level, intensity;
    if (consecutiveWrongs === 1) {
        level = encourageData.mild;
        intensity = 'mild';
    } else if (consecutiveWrongs === 2) {
        level = encourageData.medium;
        intensity = 'medium';
    } else {
        level = encourageData.heavy;
        intensity = 'heavy';
    }
    const encourage = level[Math.floor(Math.random() * level.length)];
    encourage.intensity = intensity;
    return encourage;
}

// ============================================
// UI 交互函数
// ============================================
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function showReward(type, amount) {
    const popup = document.getElementById('rewardPopup');
    const icon = document.getElementById('rewardIcon');
    const text = document.getElementById('rewardText');
    const amountEl = document.getElementById('rewardAmount');

    popup.classList.remove('loss');
    if (type === 'score') {
        icon.textContent = '⭐';
        text.textContent = '积分增加';
    } else {
        icon.textContent = '🌟';
        text.textContent = '星星获得';
    }
    amountEl.textContent = '+' + amount;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 1000);
}

function showEncourage(encourage) {
    const popup = document.getElementById('rewardPopup');
    const icon = document.getElementById('rewardIcon');
    const text = document.getElementById('rewardText');
    const amount = document.getElementById('rewardAmount');

    popup.classList.add('loss');
    icon.className = 'reward-icon roast-emoji';
    icon.textContent = encourage.emoji;
    icon.style.fontSize = '40px';

    text.innerHTML = `<div class="roast-text">${encourage.text}</div>`;
    amount.textContent = '加油！';
    amount.style.color = 'var(--color-gold)';

    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.remove('loss');
        icon.style.fontSize = '';
    }, 2000);
}

function updateScoreDisplay() {
    document.getElementById('goldAmount').textContent = score;
    document.getElementById('silverAmount').textContent = stars;
}

// ============================================
// 答题逻辑
// ============================================
function startQuiz() {
    const shuffled = shuffleArray([...POEMS_DATA]);
    const selectedPoems = shuffled.slice(0, 30);

    currentQuestions = selectedPoems.map(poem => generateQuestion(poem));
    currentQuestionIndex = 0;
    combo = 0;
    maxCombo = 0;
    correctCount = 0;
    sessionScore = 0;
    sessionStars = 0;
    consecutiveWrongs = 0;

    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('active');
    document.getElementById('quizScreen').classList.add('active');

    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResult();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    const poemDisplay = document.getElementById('questionPoem');
    document.getElementById('questionText').textContent = q.question;

    // 根据题型格式化诗句显示
    poemDisplay.innerHTML = formatPoemDisplay(q);

    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(option, q, btn));
        container.appendChild(btn);
    });

    const progress = (currentQuestionIndex / currentQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// 格式化诗句显示，确保对仗工整
function formatPoemDisplay(question) {
    const poem = question.poem;

    // 创建统一的古纸卷容器
    let html = `<div class="poem-scroll">
        <div class="poem-header">
            <span class="poem-title">《${poem.title}》</span>
            <span class="poem-separator">·</span>
            <span class="poem-author">${poem.dynasty} · ${poem.author}</span>
        </div>
        <div class="poem-body">`;

    if (question.type === 'fillBlank' || question.type === 'nextLine') {
        // 提取问题中的诗句
        const questionText = question.question.match(/"(.+?)"/);
        if (questionText) {
            const quote = questionText[1];
            // 找到诗句中的上下联
            const lines = extractCouplet(poem.content, quote, question.type);
            if (lines) {
                html += `<div class="poem-couplet">
                    <span class="poem-line">${lines.upper}</span>
                    <span class="poem-separator">，</span>
                    <span class="poem-line">${lines.lower}</span>
                </div>`;
                html += '</div></div>'; // 关闭poem-body和poem-scroll
                return html;
            }
        }
        // 如果找不到对仗，简单分行显示
        html += formatSimpleLines(poem.content);
    } else {
        // 作者题和标题题，显示完整诗句
        html += formatPoemLines(poem.content);
    }

    html += '</div></div>'; // 关闭poem-body和poem-scroll
    return html;
}

// 提取诗句的对仗上下联
function extractCouplet(content, questionLine, questionType) {
    const sentences = content.split(/[，。！？]/).filter(s => s.trim().length > 0);

    // 找到问题句的位置
    const questionIndex = sentences.findIndex(s => s.includes(questionLine) || questionLine.includes(s));
    if (questionIndex === -1) return null;

    // 检查是否是偶数位置（通常上联在偶数索引）
    const isEven = questionIndex % 2 === 0;

    // 找到上下联
    let upperLine, lowerLine;

    if (isEven && questionIndex + 1 < sentences.length) {
        // 问题句是上联
        upperLine = sentences[questionIndex];
        lowerLine = sentences[questionIndex + 1];
    } else if (questionIndex > 0) {
        // 问题句是下联
        upperLine = sentences[questionIndex - 1];
        lowerLine = sentences[questionIndex];
    } else {
        return null;
    }

    // 如果问题是下一句，则下联显示为空
    if (questionType === 'fillBlank' || questionType === 'nextLine') {
        // 将下联替换为下划线
        const blankLength = lowerLine.length;
        const underline = '____'.repeat(Math.ceil(blankLength / 2));
        return {
            upper: upperLine,
            lower: `<span class="blank-line">${underline}</span>`
        };
    }

    return { upper: upperLine, lower: lowerLine };
}

// 简单分行显示
function formatSimpleLines(content) {
    const lines = content.split(/[，。！？]/).filter(s => s.trim().length > 0);
    let html = '';

    for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 < lines.length) {
            // 成对显示
            html += `<div class="poem-couplet">
                <span class="poem-line">${lines[i]}</span>
                <span class="poem-separator">，</span>
                <span class="poem-line">${lines[i + 1]}</span>
            </div>`;
        } else {
            // 单句显示
            html += `<div class="poem-line">${lines[i]}</div>`;
        }

        // 添加句子分隔（除了最后一对）
        if (i + 2 < lines.length) {
            html += `<div class="poem-separator" style="margin: 4px 0;">。</div>`;
        }
    }

    return html;
}

// 格式化完整诗句显示
function formatPoemLines(content) {
    // 按句号或问号、感叹号分割成完整句子
    const sentences = content.match(/[^。！？]*[。！？]/g) || [content];

    let html = '';

    sentences.forEach((sentence, index) => {
        // 去除标点
        const cleanSentence = sentence.replace(/[，。！？、]/g, '');
        if (!cleanSentence) return;

        // 按逗号分割成短语
        const phrases = sentence.split(/[，。！？]/).filter(p => p.trim().length > 0);

        if (phrases.length >= 2) {
            // 两句成联，横向排列
            html += `<div class="poem-couplet">
                <span class="poem-line">${phrases[0]}</span>
                <span class="poem-separator">，</span>
                <span class="poem-line">${phrases[1]}</span>
            </div>`;
        } else if (phrases.length === 1) {
            // 单句显示
            html += `<div class="poem-line">${phrases[0]}</div>`;
        }

        // 添加句子间分隔（最后一个不加）
        if (index < sentences.length - 1) {
            html += `<div class="poem-separator" style="margin: 4px 0;">。</div>`;
        }
    });

    return html;
}

function selectAnswer(answer, question, btn) {
    const isCorrect = answer === question.correct;
    const buttons = document.querySelectorAll('.option-btn');

    buttons.forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.classList.add('correct');
        handleCorrect();
    } else {
        btn.classList.add('wrong');
        buttons.forEach(b => {
            if (b.textContent === question.correct) {
                b.classList.add('correct');
            }
        });
        handleWrong();
    }

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1200);
}

function handleCorrect() {
    correctCount++;
    combo++;
    maxCombo = Math.max(maxCombo, combo);
    consecutiveWrongs = 0;

    let scoreReward = 10;
    let starReward = 1;

    if (combo >= 3) {
        scoreReward = 20;
        starReward = 2;
    }
    if (combo >= 5) {
        scoreReward = 30;
        starReward = 3;
    }
    if (combo >= 10) {
        scoreReward = 50;
        starReward = 5;
    }

    score += scoreReward;
    stars += starReward;
    sessionScore += scoreReward;
    sessionStars += starReward;

    updateScoreDisplay();
    showReward('score', scoreReward);

    if (combo >= 2) {
        document.getElementById('comboDisplay').style.display = 'block';
        document.getElementById('comboCount').textContent = combo;
    }
}

function handleWrong() {
    combo = 0;
    document.getElementById('comboDisplay').style.display = 'none';

    const encourage = getRandomEncourage();

    score = Math.max(0, score - 5);
    showEncourage(encourage);
    updateScoreDisplay();
}

function showResult() {
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.add('active');
    document.getElementById('progressBar').style.width = '100%';

    const percentage = (correctCount / currentQuestions.length) * 100;
    currentGrade = calculateGrade(percentage);

    document.getElementById('correctCount').textContent = `${correctCount}/${currentQuestions.length}`;
    document.getElementById('goldEarned').textContent = sessionScore;
    document.getElementById('silverEarned').textContent = sessionStars;
    document.getElementById('maxCombo').textContent = maxCombo;

    // 评级
    const gradeContainer = document.getElementById('gradeContainer');
    gradeContainer.innerHTML = `
        <div class="stat-card full-width">
            <div class="stat-label">成绩评级</div>
            <div style="text-align: center; padding: 10px 0;">
                <div class="grade-badge" style="background: ${currentGrade.bg}; color: ${currentGrade.color};">
                    ${currentGrade.letter}
                </div>
                <div class="stat-value large" style="color: ${currentGrade.color}; margin-top: 8px;">
                    ${Math.round(percentage)}分
                </div>
            </div>
        </div>
        <div class="stat-card full-width">
            <div class="stat-label">评价</div>
            <div class="evaluation-text">${getEvaluation(percentage)}</div>
        </div>
    `;
}

function calculateGrade(percentage) {
    if (percentage >= 90) {
        return { letter: '诗仙', score: percentage, color: '#d4af37', bg: 'rgba(212, 175, 55, 0.2)' };
    } else if (percentage >= 80) {
        return { letter: '诗圣', score: percentage, color: '#f4d03f', bg: 'rgba(244, 208, 63, 0.2)' };
    } else if (percentage >= 70) {
        return { letter: '诗豪', score: percentage, color: '#c0c0c0', bg: 'rgba(192, 192, 192, 0.2)' };
    } else if (percentage >= 60) {
        return { letter: '诗童', score: percentage, color: '#cd7f32', bg: 'rgba(205, 127, 50, 0.2)' };
    } else {
        return { letter: '学童', score: percentage, color: '#b71c1c', bg: 'rgba(183, 28, 28, 0.2)' };
    }
}

function getEvaluation(percentage) {
    if (percentage >= 90) {
        return '🏆 <strong>诗仙降世</strong><br>太棒了！你对古诗词的造诣令人敬佩！继续保持这份热爱！';
    } else if (percentage >= 80) {
        return '🥇 <strong>诗坛新秀</strong><br>非常优秀！你对诗词的理解已经超越大多数人。继续加油，必成大家！';
    } else if (percentage >= 70) {
        return '🥈 <strong>诗兴盎然</strong><br>不错不错！你已经具备了扎实的诗词基础，继续磨练会更棒！';
    } else if (percentage >= 60) {
        return '🥉 <strong>诗心初萌</strong><br>及格了！看来你还是有点东西的，继续加油练习！';
    } else {
        return '📚 <strong>需要努力</strong><br>你的诗词之路才刚刚开始。建议多读多背，相信你会进步的！';
    }
}

function restartQuiz() {
    document.getElementById('resultScreen').classList.remove('active');
    document.getElementById('welcomeScreen').classList.remove('hidden');
    consecutiveWrongs = 0;
}

// ============================================
// 小红书容器端能力集成
// ============================================
const miniTool = window.xhs?.miniTool;

// 保存成绩图片到相册
async function saveResultImage() {
    if (!miniTool) {
        showToast('当前环境不支持保存功能');
        return;
    }

    try {
        showToast('正在生成成绩图片...');

        const canvas = document.getElementById('resultCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 750;
        canvas.height = 1334;

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0a0e1a');
        gradient.addColorStop(0.5, '#1d3d4a');
        gradient.addColorStop(1, '#0a0e1a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#d4af37';
        ctx.font = 'bold 60px "PingFang SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('青云诗社', canvas.width / 2, 120);

        ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
        ctx.font = '32px "PingFang SC", sans-serif';
        ctx.fillText('诗词挑战成绩单', canvas.width / 2, 180);

        ctx.fillStyle = currentGrade.color;
        ctx.font = 'bold 100px "PingFang SC", sans-serif';
        ctx.fillText(currentGrade.letter, canvas.width / 2, 350);

        const startY = 500;
        const lineHeight = 80;
        const stats = [
            `答对题数：${correctCount}/${currentQuestions.length}`,
            `获得积分：${sessionScore} ⭐`,
            `获得星星：${sessionStars} 🌟`,
            `最高连击：${maxCombo} 连对`
        ];

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '36px "PingFang SC", sans-serif';
        stats.forEach((stat, index) => {
            ctx.fillText(stat, canvas.width / 2, startY + index * lineHeight);
        });

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '24px "PingFang SC", sans-serif';
        ctx.fillText('—— 以诗会友，快乐学习 ——', canvas.width / 2, canvas.height - 80);

        const dataUrl = canvas.toDataURL('image/png');

        await miniTool.saveImageToPhotosAlbum({ filePath: dataUrl });
        showToast('成绩图片已保存到相册！');
    } catch (error) {
        console.error('保存图片失败:', error);
        showToast('保存失败，请重试');
    }
}

// 发布笔记
async function postResultNote() {
    if (!miniTool) {
        showToast('当前环境不支持发布功能');
        return;
    }

    try {
        showToast('正在准备发布...');

        const canvas = document.getElementById('resultCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 750;
        canvas.height = 1334;

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0a0e1a');
        gradient.addColorStop(0.5, '#1d3d4a');
        gradient.addColorStop(1, '#0a0e1a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#d4af37';
        ctx.font = 'bold 60px "PingFang SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('青云诗社', canvas.width / 2, 120);

        ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
        ctx.font = '32px "PingFang SC", sans-serif';
        ctx.fillText('诗词挑战成绩单', canvas.width / 2, 180);

        ctx.fillStyle = currentGrade.color;
        ctx.font = 'bold 100px "PingFang SC", sans-serif';
        ctx.fillText(currentGrade.letter, canvas.width / 2, 350);

        const startY = 500;
        const lineHeight = 80;
        const stats = [
            `答对题数：${correctCount}/${currentQuestions.length}`,
            `获得积分：${sessionScore} ⭐`,
            `获得星星：${sessionStars} 🌟`,
            `最高连击：${maxCombo} 连对`
        ];

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '36px "PingFang SC", sans-serif';
        stats.forEach((stat, index) => {
            ctx.fillText(stat, canvas.width / 2, startY + index * lineHeight);
        });

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '24px "PingFang SC", sans-serif';
        ctx.fillText('—— 以诗会友，快乐学习 ——', canvas.width / 2, canvas.height - 80);

        const dataUrl = canvas.toDataURL('image/png');

        const { filePath } = await miniTool.writeTempFile({ data: dataUrl });

        await miniTool.postNote({
            title: '我在青云诗社的诗词挑战成绩',
            content: `刚刚完成了青云诗社的诗词挑战！\n\n答对 ${correctCount}/${currentQuestions.length} 题\n获得积分 ${sessionScore} ⭐\n获得星星 ${sessionStars} 🌟\n最高连击 ${maxCombo} 连对\n\n评级：${currentGrade.letter}\n\n你也来挑战一下吧！一起快乐学习古诗词～`,
            tags: '诗词挑战,青云诗社,古诗词',
            mediaInfo: {
                image_resources: [{ url: filePath }]
            }
        });

        showToast('已唤起发布页面！');
    } catch (error) {
        console.error('发布笔记失败:', error);
        showToast('发布失败，请重试');
    }
}

// ============================================
// 视差效果
// ============================================
function initParallax() {
    const layers = document.querySelectorAll('.layer');
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    });

    document.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        mouseX = (touch.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (touch.clientY - window.innerHeight / 2) / window.innerHeight;
    }, { passive: true });

    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0.05;
            const x = currentX * speed * 100;
            const y = currentY * speed * 100;
            layer.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ============================================
// 初始化
// ============================================
function initApp() {
    try {
        const startBtn = document.getElementById('startQuizBtn');
        const restartBtn = document.getElementById('restartQuizBtn');
        const saveImageBtn = document.getElementById('saveImageBtn');
        const postNoteBtn = document.getElementById('postNoteBtn');

        if (!startBtn) {
            console.error('startQuizBtn not found');
            return;
        }

        startBtn.addEventListener('click', function(e) {
            console.log('Start button clicked');
            e.preventDefault();
            e.stopPropagation();
            try {
                startQuiz();
            } catch (error) {
                console.error('Error in startQuiz:', error);
            }
        });

        restartBtn.addEventListener('click', function(e) {
            console.log('Restart button clicked');
            e.preventDefault();
            e.stopPropagation();
            try {
                restartQuiz();
            } catch (error) {
                console.error('Error in restartQuiz:', error);
            }
        });

        if (miniTool) {
            saveImageBtn.addEventListener('click', function(e) {
                e.preventDefault();
                saveResultImage().catch(console.error);
            });
            postNoteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                postResultNote().catch(console.error);
            });
        } else {
            saveImageBtn.style.display = 'none';
            postNoteBtn.style.display = 'none';
        }

        initParallax();
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
