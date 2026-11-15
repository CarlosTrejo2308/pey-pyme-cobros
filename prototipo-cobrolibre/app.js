const $=s=>document.querySelector(s);
const LI={es:0,en:1,zh:2,fr:3};
const LOC={es:'es-MX',en:'en-US',zh:'zh-CN',fr:'fr-FR'};
const LANGS=[['es','Español'],['en','English'],['zh','中文'],['fr','Français']];
const T={
sub:[`Cobra sin comisiones`,`Get paid, zero fees`,`零手续费收款`,`Encaissez sans commission`],
nInicio:[`Inicio`,`Home`,`首页`,`Accueil`],nCobrar:[`Cobrar`,`Charge`,`收款`,`Encaisser`],nMens:[`Mensuales`,`Monthly`,`月付`,`Mensuel`],nAyuda:[`Ayuda`,`Help`,`帮助`,`Aide`],nProy:[`Proyecto`,`Project`,`项目`,`Projet`],
hi:[`¡Hola, {n}!`,`Hello, {n}!`,`你好，{n}！`,`Bonjour, {n} !`],
hiTxt:[`Soy Mati. Te ayudo a cobrar sin pagar comisiones. Toca un botón o háblame.`,`I'm Mati. I help you get paid with no fees. Tap a button or talk to me.`,`我是 Mati。我帮您零手续费收款。点一个按钮，或直接和我说话。`,`Je suis Mati. Je vous aide à encaisser sans commission. Touchez un bouton ou parlez-moi.`],
hear:[`🔊 Escuchar a Mati`,`🔊 Listen to Mati`,`🔊 听 Mati 说`,`🔊 Écouter Mati`],
reg1:[`Primero, registra tu negocio`,`First, register your business`,`先注册您的生意`,`D'abord, inscrivez votre commerce`],
reg2:[`Son 3 pasos sencillos. Sin costo y sin comisiones.`,`Just 3 easy steps. Free, no fees.`,`只需3个简单步骤。免费，零手续费。`,`3 étapes simples. Gratuit, sans commission.`],
regBtn:[`Registrar mi negocio`,`Register my business`,`注册我的生意`,`Inscrire mon commerce`],
got:[`Has recibido`,`You have received`,`您已收到`,`Vous avez reçu`],
saved:[`Comisiones que NO pagaste:`,`Fees you did NOT pay:`,`您省下的手续费：`,`Commissions épargnées :`],
savedHint:[`Comparado con una terminal que cobra 3.6% + IVA (ejemplo ilustrativo).`,`Compared with a card terminal charging 3.6% + VAT (illustrative example).`,`与收取3.6%+增值税的刷卡机相比（示例）。`,`Comparé à un terminal à 3,6 % + TVA (exemple illustratif).`],
tCobrar:[`Cobrar`,`Charge`,`收款`,`Encaisser`],tCobrarS:[`Con QR o WhatsApp`,`With QR or WhatsApp`,`二维码或 WhatsApp`,`Par QR ou WhatsApp`],
tMens:[`Cobros mensuales`,`Monthly payments`,`每月收款`,`Paiements mensuels`],tMensS:[`Tus clientes fijos`,`Your regular clients`,`您的固定客户`,`Vos clients réguliers`],
tLup:[`Hablar con Mati`,`Talk to Mati`,`和 Mati 聊聊`,`Parler à Mati`],tLupS:[`Por voz o escribiendo`,`By voice or text`,`语音或文字`,`À la voix ou par écrit`],
tCat:[`Mis tours y artesanías`,`My tours & crafts`,`我的行程与手工艺品`,`Mes visites et artisanat`],tCatS:[`Catálogo de precios`,`Price catalog`,`价格目录`,`Catalogue de prix`],
upc:[`Próximos cobros mensuales`,`Upcoming monthly payments`,`即将到来的月付`,`Prochains paiements mensuels`],
noRec:[`Aún no tienes cobros programados.`,`No scheduled payments yet.`,`暂无已安排的收款。`,`Aucun paiement programmé.`],
orgT:[`Hecho con cariño en México`,`Made with love in Mexico`,`墨西哥用心制作`,`Fait avec amour au Mexique`],
orgP:[`Para turismo, agencias de viaje y pequeños negocios artesanos: guías, talleres, tiendas y fondas.`,`For tourism, travel agencies and small artisan businesses: guides, workshops, shops and eateries.`,`为旅游业、旅行社和手工艺小商家：导游、工坊、商店和小餐馆。`,`Pour le tourisme, les agences de voyage et les petits artisans : guides, ateliers, boutiques et petites tables.`],
a1:[`Barro y talavera`,`Clay & talavera`,`陶器与彩陶`,`Terre cuite et talavera`],a2:[`Sarape`,`Sarape`,`萨拉佩毯`,`Sarape`],a3:[`Cempasúchil`,`Marigold`,`万寿菊`,`Cempasúchil`],a4:[`Sombrero`,`Sombrero`,`宽边帽`,`Sombrero`],a5:[`Alebrije`,`Alebrije`,`阿莱布里赫`,`Alebrije`],
orgHint:[`Sello decorativo original de CobroLibre. El distintivo oficial «Hecho en México» requiere autorización de la Secretaría de Economía, y el escudo de la bandera aquí está simplificado.`,`Original decorative seal by CobroLibre. The official “Hecho en México” mark requires authorization from Mexico's Ministry of Economy, and the flag emblem here is simplified.`,`CobroLibre 原创装饰印章。官方“Hecho en México”标志需经墨西哥经济部授权；此处国旗徽章为简化版。`,`Sceau décoratif original de CobroLibre. Le label officiel « Hecho en México » requiert l'autorisation du ministère de l'Économie, et l'emblème du drapeau est simplifié ici.`],
r1:[`Tu negocio`,`Your business`,`您的生意`,`Votre commerce`],
bName:[`Nombre del negocio`,`Business name`,`店铺名称`,`Nom du commerce`],bOwner:[`Tu nombre`,`Your name`,`您的姓名`,`Votre nom`],bGiro:[`¿A qué se dedica?`,`What does it do?`,`经营什么？`,`Quelle activité ?`],bCel:[`Celular (el que usas en WhatsApp)`,`Mobile (the one you use on WhatsApp)`,`手机号（WhatsApp 使用的）`,`Portable (celui de WhatsApp)`],rfc:[`RFC es opcional para empezar.`,`Tax ID (RFC) is optional to start.`,`开始时税号（RFC）为选填。`,`Le RFC est facultatif pour commencer.`],
next:[`Continuar`,`Continue`,`继续`,`Continuer`],back:[`Atrás`,`Back`,`返回`,`Retour`],
r2:[`Verifica que eres tú`,`Verify it's you`,`验证身份`,`Vérifiez votre identité`],
curp:[`CURP`,`CURP (national ID)`,`CURP（身份编号）`,`CURP (identifiant national)`],
curpHint:[`La Ley de Economía Digital reconoce la CURP Digital como forma de identificarte. En esta demo no se envía a ningún lado.`,`The Digital Economy Law recognizes the Digital CURP as a way to identify you. In this demo nothing is sent anywhere.`,`《数字经济法》认可数字CURP作为身份验证方式。本演示不会发送任何数据。`,`La Loi sur l'économie numérique reconnaît la CURP numérique comme moyen d'identification. Dans cette démo, rien n'est envoyé.`],
code:[`Código que te mandamos por WhatsApp`,`Code we sent you on WhatsApp`,`我们通过 WhatsApp 发给您的验证码`,`Code envoyé par WhatsApp`],
r3:[`¿Dónde recibes tu dinero?`,`Where do you receive your money?`,`您在哪里收款？`,`Où recevez-vous votre argent ?`],
clabe:[`CLABE o cuenta (puede ser cuenta N2 Bis)`,`CLABE or account (can be an N2 Bis account)`,`CLABE 或账户（可为 N2 Bis 账户）`,`CLABE ou compte (peut être un compte N2 Bis)`],
clabeHint:[`El dinero llega directo a tu cuenta por SPEI/CoDi. CobroLibre no lo retiene ni cobra comisión por cobro.`,`Money goes straight to your account via SPEI/CoDi. CobroLibre does not hold it or charge a fee per payment.`,`款项通过 SPEI/CoDi 直接进入您的账户。CobroLibre 不代持资金，也不收取每笔手续费。`,`L'argent arrive directement sur votre compte via SPEI/CoDi. CobroLibre ne le retient pas et ne prélève aucune commission.`],
finish:[`Terminar registro`,`Finish registration`,`完成注册`,`Terminer l'inscription`],
step:[`Paso {a} de 3`,`Step {a} of 3`,`第 {a} 步，共 3 步`,`Étape {a} sur 3`],
g1:[`Cuéntame de tu negocio. ¡Yo te voy guiando!`,`Tell me about your business. I'll guide you!`,`说说您的生意吧，我来一步步带您！`,`Parlez-moi de votre commerce. Je vous guide !`],
g2:[`Es para cuidar tu dinero y que nadie se haga pasar por ti. 🔒`,`This protects your money so nobody can pretend to be you. 🔒`,`这是为了保护您的资金，防止他人冒充。🔒`,`C'est pour protéger votre argent et éviter l'usurpation. 🔒`],
g3:[`Último paso. Aquí te llegará tu dinero, directo y sin comisiones.`,`Last step. Your money will arrive here, direct and fee-free.`,`最后一步。您的款项将直接到账，零手续费。`,`Dernière étape. Votre argent arrivera ici, direct et sans commission.`],
done:[`¡Listo, ya puedes cobrar!`,`All set, you can charge now!`,`完成，您现在可以收款了！`,`C'est prêt, vous pouvez encaisser !`],doneS:[`Tu negocio quedó registrado.`,`Your business is registered.`,`您的生意已注册。`,`Votre commerce est inscrit.`],
gv:[`Agencia de viajes`,`Travel agency`,`旅行社`,`Agence de voyages`],gg:[`Guía de turistas`,`Tour guide`,`导游`,`Guide touristique`],ga:[`Artesanías`,`Handicrafts`,`手工艺品`,`Artisanat`],gh:[`Hospedaje`,`Lodging`,`住宿`,`Hébergement`],gr:[`Restaurante o fonda`,`Restaurant or eatery`,`餐馆`,`Restaurant ou fonda`],gt:[`Tienda`,`Shop`,`商店`,`Boutique`],gs:[`Servicios`,`Services`,`服务`,`Services`],go:[`Otro`,`Other`,`其他`,`Autre`],
cT:[`Cobrar`,`Charge`,`收款`,`Encaisser`],
gC:[`Dime a quién le cobras y cuánto. Yo hago el QR.`,`Tell me who you're charging and how much. I'll make the QR.`,`告诉我向谁收款、收多少，二维码我来做。`,`Dites-moi qui vous facturez et combien. Je fais le QR.`],
cName:[`Nombre del cliente`,`Client name`,`客户姓名`,`Nom du client`],cPhone:[`Celular del cliente`,`Client mobile`,`客户手机`,`Portable du client`],cAmt:[`Monto en pesos`,`Amount in pesos (MXN)`,`金额（墨西哥比索）`,`Montant en pesos (MXN)`],cWhy:[`¿Por qué es el cobro?`,`What is the payment for?`,`收款事由`,`Motif du paiement`],cLang:[`Idioma del cliente (para su mensaje)`,`Client's language (for their message)`,`客户语言（用于其消息）`,`Langue du client (pour son message)`],cMk:[`Crear cobro y QR`,`Create charge & QR`,`创建收款与二维码`,`Créer le paiement et le QR`],
cPick:[`Elegir de mi catálogo`,`Pick from my catalog`,`从目录选择`,`Choisir dans mon catalogue`],
approx:[`Aproximado para tu cliente:`,`Approximate for your client:`,`客户参考金额：`,`Approximatif pour votre client :`],
fxT:[`Tipo de cambio de ejemplo (edítalo):`,`Sample exchange rates (edit them):`,`示例汇率（可修改）：`,`Taux de change d'exemple (modifiables) :`],
touristNote:[`CobroLibre no cobra comisión. Si el turista paga con tarjeta extranjera, su banco podría cobrarle.`,`CobroLibre charges no fee. If a tourist pays with a foreign card, their bank may charge them.`,`CobroLibre 不收手续费。游客若用外国银行卡支付，其银行可能收费。`,`CobroLibre ne prélève aucune commission. Si le touriste paie avec une carte étrangère, sa banque peut lui facturer des frais.`],
qrReady:[`Cobro listo: {m}`,`Charge ready: {m}`,`收款已就绪：{m}`,`Paiement prêt : {m}`],
qrHint:[`QR de demostración. En producción será un QR CoDi/DiMo real emitido por una institución autorizada.`,`Demo QR. In production it will be a real CoDi/DiMo QR issued by an authorized institution.`,`演示二维码。正式版将由授权机构签发真实的 CoDi/DiMo 二维码。`,`QR de démonstration. En production, ce sera un vrai QR CoDi/DiMo émis par un établissement agréé.`],
sendWA:[`📲 Enviar por WhatsApp`,`📲 Send via WhatsApp`,`📲 通过 WhatsApp 发送`,`📲 Envoyer par WhatsApp`],simPay:[`Simular: el cliente ya pagó`,`Simulate: client has paid`,`模拟：客户已付款`,`Simuler : le client a payé`],
myCh:[`Mis cobros`,`My charges`,`我的收款`,`Mes paiements`],paidT:[`Pagado`,`Paid`,`已付`,`Payé`],pendT:[`Pendiente`,`Pending`,`待付`,`En attente`],
miss:[`Falta el nombre o el monto.`,`Name or amount is missing.`,`缺少姓名或金额。`,`Nom ou montant manquant.`],
payRecv:[`¡Pago recibido!`,`Payment received!`,`已收到付款！`,`Paiement reçu !`],payRecvS:[`{c} te pagó {m}. Sin comisiones.`,`{c} paid you {m}. No fees.`,`{c} 向您支付了 {m}，零手续费。`,`{c} vous a payé {m}. Sans commission.`],
wm:[`Hola {c}, te comparto tu cobro de {m} por «{w}» de {b}. Paga con tu app del banco escaneando el QR o por SPEI. Sin comisiones. Ref: CL-{id}`,`Hello {c}, here is your payment request of {m} for “{w}” from {b}. Pay with your bank app by scanning the QR or via SPEI. No fees. Ref: CL-{id}`,`您好 {c}，这是来自 {b} 的付款请求：{w}，金额 {m}。请用银行 App 扫描二维码或通过 SPEI 支付，零手续费。编号：CL-{id}`,`Bonjour {c}, voici votre demande de paiement de {m} pour « {w} » de {b}. Payez avec l'app de votre banque en scannant le QR ou via SPEI. Sans commission. Réf. : CL-{id}`],
conceptRec:[`Cobro recurrente`,`Recurring payment`,`定期收款`,`Paiement récurrent`],conceptBot:[`Cobro por asistente`,`Charge via assistant`,`助手创建的收款`,`Paiement via l'assistante`],
kT:[`Mis tours y artesanías`,`My tours & crafts`,`我的行程与手工艺品`,`Mes visites et artisanat`],
kG:[`Guarda tus precios una vez y cóbralos con un toque.`,`Save your prices once and charge them with one tap.`,`价格保存一次，点一下即可收款。`,`Enregistrez vos prix une fois et encaissez en un geste.`],
kAdd:[`Agregar al catálogo`,`Add to catalog`,`添加到目录`,`Ajouter au catalogue`],kName:[`Nombre (tour, taller o producto)`,`Name (tour, workshop or product)`,`名称（行程、工坊或商品）`,`Nom (visite, atelier ou produit)`],kPrice:[`Precio en pesos`,`Price in pesos`,`价格（比索）`,`Prix en pesos`],kType:[`Tipo`,`Type`,`类型`,`Type`],
tp1:[`Tour o recorrido`,`Tour`,`行程`,`Visite guidée`],tp2:[`Artesanía`,`Handicraft`,`手工艺品`,`Artisanat`],tp3:[`Taller o experiencia`,`Workshop / experience`,`工坊/体验`,`Atelier / expérience`],tp4:[`Hospedaje o comida`,`Lodging or food`,`住宿或餐饮`,`Hébergement ou repas`],
kCharge:[`Cobrar esto`,`Charge this`,`收取此项`,`Encaisser`],kEmpty:[`Tu catálogo está vacío.`,`Your catalog is empty.`,`您的目录为空。`,`Votre catalogue est vide.`],kDel:[`Quitar`,`Remove`,`删除`,`Retirer`],
mT:[`Cobros mensuales`,`Monthly payments`,`每月收款`,`Paiements mensuels`],
mG:[`Para clientes que pagan cada mes. Ellos te autorizan y pueden cancelar cuando quieran.`,`For clients who pay every month. They authorize you and can cancel anytime.`,`适用于每月付款的客户。他们授权后，可随时取消。`,`Pour les clients qui paient chaque mois. Ils vous autorisent et peuvent annuler à tout moment.`],
mN:[`Cada cliente debe <b>autorizar</b> el cobro recurrente (domiciliación) desde su banco. Se lo pedimos por WhatsApp y puede cancelarlo cuando quiera.`,`Each client must <b>authorize</b> the recurring charge (direct debit) from their bank. We ask them via WhatsApp and they can cancel anytime.`,`每位客户必须通过其银行<b>授权</b>定期扣款（代扣）。我们通过 WhatsApp 请求授权，客户可随时取消。`,`Chaque client doit <b>autoriser</b> le prélèvement récurrent auprès de sa banque. Nous le demandons par WhatsApp et il peut annuler à tout moment.`],
mProg:[`Programar un cobro`,`Schedule a payment`,`安排一笔收款`,`Programmer un paiement`],mEvery:[`Cada cuánto`,`How often`,`频率`,`Fréquence`],
f1:[`mensual`,`monthly`,`每月`,`mensuel`],f2:[`quincenal`,`every two weeks`,`每两周`,`bimensuel`],f3:[`semanal`,`weekly`,`每周`,`hebdomadaire`],
mDay:[`Día del cobro (1 a 28)`,`Day of the month (1-28)`,`收款日（1–28）`,`Jour du prélèvement (1 à 28)`],mAsk:[`Pedir autorización por WhatsApp`,`Request authorization via WhatsApp`,`通过 WhatsApp 请求授权`,`Demander l'autorisation par WhatsApp`],
mMy:[`Mis cobros programados`,`My scheduled payments`,`我的已安排收款`,`Mes paiements programmés`],
sActive:[`Activo`,`Active`,`生效中`,`Actif`],sPaused:[`Pausado`,`Paused`,`已暂停`,`En pause`],sWait:[`Esperando autorización`,`Awaiting authorization`,`等待授权`,`En attente d'autorisation`],
simAuth:[`Simular: autorizó`,`Simulate: authorized`,`模拟：已授权`,`Simuler : autorisé`],chToday:[`Cobrar hoy`,`Charge today`,`今天收款`,`Encaisser aujourd'hui`],pause:[`Pausar`,`Pause`,`暂停`,`Mettre en pause`],resume:[`Reanudar`,`Resume`,`恢复`,`Reprendre`],
dayN:[`día {d}`,`day {d}`,`每月{d}日`,`le {d}`],cust:[`Cliente`,`Client`,`客户`,`Client`],
aT:[`Mi asistente`,`My assistant`,`我的助手`,`Mon assistant`],
aHint:[`Así se ve dentro de WhatsApp. Habla con el micrófono o escribe.`,`This is how it looks inside WhatsApp. Speak with the mic or type.`,`这是在 WhatsApp 中的样子。可用麦克风说话或输入文字。`,`Voici le rendu dans WhatsApp. Parlez avec le micro ou écrivez.`],
aHello:[`Hola 👋 Soy Mati, tu asistente de CobroLibre. Puedes escribirme o hablarme. Por ejemplo: "cobra 300 a Juan" o "¿cuánto vendí hoy?".`,`Hello 👋 I'm Mati, your CobroLibre assistant. You can type or talk to me. For example: "charge 300 to Juan" or "how much did I receive today?".`,`您好 👋 我是 Mati，您的 CobroLibre 助手。可以打字或说话，例如：“向 Juan 收款 300”或“今天收到多少？”。`,`Bonjour 👋 Je suis Mati, votre assistante CobroLibre. Écrivez ou parlez-moi. Par exemple : « encaisse 300 pour Juan » ou « combien ai-je reçu aujourd'hui ? ».`],
ph:[`Escribe aquí…`,`Type here…`,`在此输入…`,`Écrivez ici…`],micL:[`Hablar`,`Speak`,`说话`,`Parler`],sndL:[`Enviar`,`Send`,`发送`,`Envoyer`],online:[`en línea`,`online`,`在线`,`en ligne`],
chip1:[`¿Cuánto vendí hoy?`,`How much did I receive today?`,`今天收到多少？`,`Combien ai-je reçu aujourd'hui ?`],chip2:[`¿Quién me debe?`,`Who owes me?`,`谁欠我钱？`,`Qui me doit de l'argent ?`],chip3:[`Cobra 300 a Juan`,`Charge 300 to Juan`,`向 Juan 收款 300`,`Encaisse 300 pour Juan`],chip4:[`Cobro mensual de 500 a Rosa`,`Monthly charge of 500 to Rosa`,`向 Rosa 每月收款 500`,`Paiement mensuel de 500 pour Rosa`],chip5:[`Ayuda`,`Help`,`帮助`,`Aide`],
voiceRead:[`Leer las respuestas en voz alta`,`Read answers aloud`,`朗读回答`,`Lire les réponses à voix haute`],
micNo:[`Tu navegador no permite dictado por voz aquí. Escribe tu mensaje.`,`Your browser doesn't allow voice dictation here. Please type your message.`,`您的浏览器在此不支持语音输入，请直接打字。`,`Votre navigateur ne permet pas la dictée vocale ici. Écrivez votre message.`],
micErr:[`No pude escucharte. Intenta de nuevo o escribe.`,`I couldn't hear you. Try again or type.`,`没听清，请重试或打字。`,`Je ne vous ai pas entendu. Réessayez ou écrivez.`],
rCharge:[`¡Ándale, listo! Creé el cobro de {m} para {n} y le envié el QR por WhatsApp. Sin comisiones.`,`Done! I created a {m} charge for {n} and sent the QR via WhatsApp. No fees.`,`好了！我已为 {n} 创建 {m} 的收款，并通过 WhatsApp 发送了二维码。零手续费。`,`C'est fait ! J'ai créé le paiement de {m} pour {n} et envoyé le QR par WhatsApp. Sans commission.`],
rRec:[`¡Listo, con gusto! Le mandé a {n} una solicitud por WhatsApp para autorizar {m} ({f}). Cuando acepte, el cobro quedará activo.`,`Done! I sent {n} a WhatsApp request to authorize {m} ({f}). Once accepted, the payment will be active.`,`好的！我已通过 WhatsApp 请 {n} 授权 {m}（{f}）的收款。对方同意后即生效。`,`C'est fait ! J'ai envoyé à {n} une demande WhatsApp pour autoriser {m} ({f}). Dès qu'elle accepte, le paiement sera actif.`],
rRecList:[`Tus cobros programados:`,`Your scheduled payments:`,`您的已安排收款：`,`Vos paiements programmés :`],rRecNone:[`No tienes cobros programados activos.`,`You have no active scheduled payments.`,`您没有生效中的已安排收款。`,`Vous n'avez aucun paiement programmé actif.`],
rDebt:[`Tienes {k} cobros pendientes por {m}:`,`You have {k} pending payments totaling {m}:`,`您有 {k} 笔待收款，共 {m}：`,`Vous avez {k} paiements en attente pour {m} :`],rDebtNone:[`Nadie te debe nada por ahora.`,`Nobody owes you anything right now.`,`目前没有人欠您钱。`,`Personne ne vous doit rien pour le moment.`],
rGot:[`Has recibido {m} en {k} pagos. Te ahorraste {s} en comisiones.`,`You have received {m} in {k} payments. You saved {s} in fees.`,`您已通过 {k} 笔付款收到 {m}，节省手续费 {s}。`,`Vous avez reçu {m} en {k} paiements. Vous avez économisé {s} de commissions.`],
rHelp:[`Puedo:\n• Crear cobros: "cobra 300 a Juan"\n• Programar cobros: "cobro mensual de 500 a Rosa"\n• Decirte cuánto has recibido\n• Decirte quién te debe`,`I can:\n• Create charges: "charge 300 to Juan"\n• Schedule payments: "monthly charge of 500 to Rosa"\n• Tell you how much you received\n• Tell you who owes you`,`我可以：\n• 创建收款：“向 Juan 收款 300”\n• 安排定期收款：“向 Rosa 每月收款 500”\n• 告诉您收到了多少\n• 告诉您谁欠您钱`,`Je peux :\n• Créer des paiements : « encaisse 300 pour Juan »\n• Programmer des paiements : « paiement mensuel de 500 pour Rosa »\n• Vous dire combien vous avez reçu\n• Vous dire qui vous doit de l'argent`],
rUnk:[`No entendí bien. Puedes decir, por ejemplo: "cobra 300 a Juan" o "¿cuánto vendí hoy?". Escribe "ayuda" para ver más.`,`I didn't quite get that. Try: "charge 300 to Juan" or "how much did I receive today?". Type "help" for more.`,`我没太听懂。您可以说：“向 Juan 收款 300”或“今天收到多少？”。输入“帮助”查看更多。`,`Je n'ai pas bien compris. Essayez : « encaisse 300 pour Juan » ou « combien ai-je reçu aujourd'hui ? ». Écrivez « aide » pour en savoir plus.`],
pT:[`Sobre el proyecto`,`About the project`,`关于项目`,`À propos du projet`],
pv:[`Propuesta de valor`,`Value proposition`,`价值主张`,`Proposition de valeur`],
pvx:[`<b>Cobra con QR y WhatsApp, el dinero llega directo a tu cuenta, sin pagar comisión por cobro.</b> Sobre rieles públicos de Banxico (SPEI/CoDi), sin comisión al comprador ni al comercio según la ATDT. Pensado para turismo, agencias de viaje y artesanos, en español, inglés, chino y francés.`,`<b>Get paid with QR and WhatsApp; money goes straight to your account with no fee per payment.</b> Built on Banxico's public rails (SPEI/CoDi), which charge neither buyer nor merchant according to ATDT. Designed for tourism, travel agencies and artisans, in Spanish, English, Chinese and French.`,`<b>用二维码和 WhatsApp 收款，款项直接进入您的账户，每笔零手续费。</b>基于墨西哥央行的公共系统（SPEI/CoDi），据 ATDT 称对买卖双方均不收费。专为旅游业、旅行社和手工艺人设计，支持西班牙语、英语、中文和法语。`,`<b>Encaissez par QR et WhatsApp ; l'argent arrive directement sur votre compte, sans commission par paiement.</b> Basé sur les rails publics de Banxico (SPEI/CoDi), sans frais pour l'acheteur ni le commerçant selon l'ATDT. Conçu pour le tourisme, les agences de voyage et les artisans, en espagnol, anglais, chinois et français.`],
pw:[`¿Para quién?`,`Who is it for?`,`适用对象`,`Pour qui ?`],
pw1:[`Agencias de viaje y guías de turistas: cobran tours y paquetes a visitantes de todo el mundo.`,`Travel agencies and tour guides: charge tours and packages to visitors from around the world.`,`旅行社和导游：向世界各地的游客收取行程和套餐费用。`,`Agences de voyage et guides : encaissez visites et forfaits auprès de visiteurs du monde entier.`],
pw2:[`Artesanas y artesanos: talleres, mercados y ferias.`,`Artisans: workshops, markets and fairs.`,`手工艺人：工坊、市集和展会。`,`Artisans : ateliers, marchés et foires.`],
pw3:[`Hospedaje, fondas y restaurantes locales.`,`Lodging, eateries and local restaurants.`,`住宿、小餐馆和本地餐厅。`,`Hébergements, petites tables et restaurants locaux.`],
pw4:[`Cobros mensuales: clases, rentas y membresías.`,`Monthly payments: classes, rent and memberships.`,`每月收款：课程、租金和会员。`,`Paiements mensuels : cours, loyers et abonnements.`],
pw5:[`Personas mayores: voz, letra grande y un asistente amable.`,`Older adults: voice, large text and a friendly assistant.`,`老年人：语音、大字体和亲切的助手。`,`Seniors : voix, grands caractères et une assistante aimable.`],
pc:[`Canal`,`Channel`,`渠道`,`Canal`],
pcx:[`<b>WhatsApp primero</b>: el negocio crea el cobro y el cliente (turista o local) recibe el QR y un mensaje en su idioma. Alianzas con cámaras de comercio, mercados, guías y asociaciones de artesanos.`,`<b>WhatsApp first</b>: the business creates the charge and the client (tourist or local) gets the QR and a message in their language. Partnerships with chambers of commerce, markets, guides and artisan associations.`,`<b>以 WhatsApp 为先</b>：商家创建收款，客户（游客或本地人）收到二维码和其语言的消息。与商会、市集、导游和手工艺协会合作。`,`<b>WhatsApp d'abord</b> : le commerce crée le paiement et le client (touriste ou local) reçoit le QR et un message dans sa langue. Partenariats avec chambres de commerce, marchés, guides et associations d'artisans.`],
pl:[`N2 Bis y la Ley`,`N2 Bis & the Law`,`N2 Bis 与法律`,`N2 Bis et la loi`],
plx:[`Las cuentas Nivel 2 Bis de Banxico permiten a micro negocios recibir hasta 15,000 UDIs al mes (aprox. $130,000) sin constancia fiscal. La Ley de Economía Digital para Pagos Digitales y Electrónicos se publicó el 4 de noviembre de 2026 e incluye la domiciliación entre los medios cubiertos.`,`Banxico's Level 2 Bis accounts let micro-businesses receive up to 15,000 UDIs per month (about $130,000 MXN) without a tax certificate. The Digital Economy Law for Digital and Electronic Payments was published on November 4, 2026 and covers direct debit among the covered means.`,`墨西哥央行的 N2 Bis 账户允许微型企业每月收款最多 15,000 UDI（约 13 万墨西哥比索），无需税务证明。《数字与电子支付数字经济法》于 2026 年 11 月 4 日公布，涵盖代扣（定期扣款）。`,`Les comptes Niveau 2 Bis de Banxico permettent aux micro-entreprises de recevoir jusqu'à 15 000 UDI par mois (environ 130 000 MXN) sans attestation fiscale. La Loi sur l'économie numérique pour les paiements numériques et électroniques a été publiée le 4 novembre 2026 et inclut le prélèvement récurrent.`],
pk:[`Competidores`,`Competitors`,`竞争对手`,`Concurrents`],thWho:[`Quién`,`Who`,`对象`,`Qui`],thWhat:[`Cobro`,`Pricing`,`收费`,`Tarification`],
pk1:[`Comisión por transacción; 41% de quienes aceptan tarjeta reportó más de 3.6% + IVA`,`Fee per transaction; 41% of those accepting cards reported more than 3.6% + VAT`,`按笔收费；41% 接受刷卡的商家称费率超过 3.6%+增值税`,`Commission par transaction ; 41 % des commerçants acceptant la carte déclarent plus de 3,6 % + TVA`],
pk2:[`Sin comisión, pero poca adopción y sin seguimiento ni recordatorios`,`No fee, but low adoption and no follow-up or reminders`,`无手续费，但普及度低，缺少跟进和提醒`,`Sans frais, mais peu adopté et sans suivi ni rappels`],
pk3:[`Sin comisión por cobro + WhatsApp en 4 idiomas + cobros recurrentes + asistente accesible`,`No fee per payment + WhatsApp in 4 languages + recurring payments + accessible assistant`,`每笔零手续费 + 4 种语言的 WhatsApp + 定期收款 + 无障碍助手`,`Sans commission + WhatsApp en 4 langues + paiements récurrents + assistante accessible`],
cpT:[`Psicología del color`,`Color psychology`,`色彩心理`,`Psychologie des couleurs`],cpH:[`Pocos colores, siempre con el mismo significado.`,`Few colors, always with the same meaning.`,`颜色少而含义始终一致。`,`Peu de couleurs, toujours avec le même sens.`],
c1:[`<b>Verde</b> · dinero, confianza, "adelante"`,`<b>Green</b> · money, trust, "go"`,`<b>绿色</b> · 金钱、信任、“前进”`,`<b>Vert</b> · argent, confiance, « go »`],
c2:[`<b>Azul</b> · seguridad y estabilidad`,`<b>Blue</b> · security and stability`,`<b>蓝色</b> · 安全与稳定`,`<b>Bleu</b> · sécurité et stabilité`],
c3:[`<b>Naranja cálido</b> · cercanía y amabilidad`,`<b>Warm orange</b> · warmth and friendliness`,`<b>暖橙色</b> · 亲切与友好`,`<b>Orange chaud</b> · convivialité et chaleur`],
c4:[`<b>Amarillo</b> · atención suave, sin alarmar`,`<b>Yellow</b> · gentle attention, no alarm`,`<b>黄色</b> · 温和提醒，不惊吓`,`<b>Jaune</b> · attention douce, sans alarmer`],
c5:[`<b>Rosa mexicano</b> · identidad y tradición`,`<b>Mexican pink</b> · identity and tradition`,`<b>墨西哥粉</b> · 身份与传统`,`<b>Rose mexicain</b> · identité et tradition`],
cpF:[`Evitamos el rojo intenso para no asustar y usamos fondo crema para cansar menos la vista.`,`We avoid intense red so as not to alarm, and use a cream background to ease eye strain.`,`避免使用强烈的红色以免惊吓，并使用奶油色背景减轻视觉疲劳。`,`Nous évitons le rouge vif pour ne pas alarmer et utilisons un fond crème pour reposer la vue.`],
proto:[`<b>Esto es un prototipo.</b> Los pagos, el QR y las autorizaciones son simulados. Para operar de verdad se necesita una institución autorizada (banco, IFPE), la API de WhatsApp Business y cumplimiento con CNBV/Banxico.`,`<b>This is a prototype.</b> Payments, QR codes and authorizations are simulated. To operate for real you need an authorized institution (bank, IFPE), the WhatsApp Business API and CNBV/Banxico compliance.`,`<b>这是原型。</b>付款、二维码和授权均为模拟。正式运营需要授权机构（银行、IFPE）、WhatsApp Business API，并遵守 CNBV/Banxico 规定。`,`<b>Ceci est un prototype.</b> Les paiements, le QR et les autorisations sont simulés. Pour opérer réellement, il faut un établissement agréé (banque, IFPE), l'API WhatsApp Business et la conformité CNBV/Banxico.`],
langT:[`Idioma`,`Language`,`语言`,`Langue`],thx:[`Gracias, Mati`,`Thanks, Mati`,`谢谢，Mati`,`Merci, Mati`],voiceOn:[`Voz de Mati activada`,`Mati's voice is on`,`Mati 的语音已开启`,`Voix de Mati activée`]
};

Object.assign(T,{
nPagar:[`Pagar`,`Pay`,`付款`,`Payer`],
tPagar:[`Pagar`,`Pay`,`付款`,`Payer`],tPagarS:[`A proveedores y personas`,`To suppliers & people`,`付给供应商和个人`,`Fournisseurs et personnes`],
tScan:[`Escanear QR`,`Scan QR`,`扫码`,`Scanner un QR`],tScanS:[`Paga en segundos`,`Pay in seconds`,`几秒完成付款`,`Payez en quelques secondes`],
pgT:[`Pagar`,`Pay`,`付款`,`Payer`],
pgG:[`¿A quién le pagas hoy? Escanea un QR, elige a alguien o dímelo con tu voz.`,`Who are you paying today? Scan a QR, pick someone or tell me with your voice.`,`今天付款给谁？扫二维码、选联系人，或直接对我说。`,`Qui payez-vous aujourd'hui ? Scannez un QR, choisissez quelqu'un ou dites-le-moi à voix haute.`],
bal:[`Tu saldo (demostración)`,`Your balance (demo)`,`您的余额（演示）`,`Votre solde (démo)`],
btnScan:[`📷 Escanear QR`,`📷 Scan QR`,`📷 扫二维码`,`📷 Scanner un QR`],btnVoice:[`🎤 Pagar con mi voz`,`🎤 Pay with my voice`,`🎤 语音付款`,`🎤 Payer à la voix`],btnMyQr:[`🔳 Mi QR`,`🔳 My QR`,`🔳 我的二维码`,`🔳 Mon QR`],
whoPay:[`¿A quién le pagas?`,`Who are you paying?`,`付款给谁？`,`Qui payez-vous ?`],addC:[`Agregar`,`Add`,`添加`,`Ajouter`],
cnName:[`Nombre`,`Name`,`姓名`,`Nom`],cnPhone:[`Celular o CLABE`,`Mobile or CLABE`,`手机号或 CLABE`,`Portable ou CLABE`],cnRole:[`¿Quién es? (proveedor, empleado, renta…)`,`Who is it? (supplier, employee, rent…)`,`是谁？（供应商、员工、房租…）`,`Qui est-ce ? (fournisseur, employé, loyer…)`],
pNote:[`¿Para qué es el pago?`,`What is the payment for?`,`付款用途`,`Motif du paiement`],
confT:[`Vas a pagar`,`You are about to pay`,`您即将支付`,`Vous allez payer`],confTo:[`a`,`to`,`收款人`,`à`],
confTip:[`Revisa que el nombre y el monto sean correctos. Nunca pagues si alguien te presiona o te pide que lo hagas rápido.`,`Check that the name and amount are correct. Never pay if someone pressures you or asks you to hurry.`,`请核对姓名和金额。如有人催促或施压，切勿付款。`,`Vérifiez le nom et le montant. Ne payez jamais si quelqu'un vous met la pression ou vous presse.`],
confBtn:[`✅ Confirmar y pagar`,`✅ Confirm and pay`,`✅ 确认并付款`,`✅ Confirmer et payer`],cancel:[`Cancelar`,`Cancel`,`取消`,`Annuler`],
newWarn:[`Contacto nuevo: verifica el nombre antes de pagar.`,`New contact: verify the name before paying.`,`新联系人：付款前请核对姓名。`,`Nouveau contact : vérifiez le nom avant de payer.`],
noFunds:[`Saldo insuficiente para este pago.`,`Not enough balance for this payment.`,`余额不足，无法完成此笔付款。`,`Solde insuffisant pour ce paiement.`],
scanT:[`Escanear QR`,`Scan QR`,`扫描二维码`,`Scanner un QR`],scanTxt:[`Apunta la cámara al código QR del negocio o de la persona.`,`Point the camera at the business's or person's QR code.`,`将摄像头对准商家或个人的二维码。`,`Dirigez la caméra vers le QR du commerce ou de la personne.`],
scanSim:[`Simular lectura de QR`,`Simulate QR scan`,`模拟扫码`,`Simuler la lecture du QR`],scanNote:[`En esta demostración no se usa la cámara.`,`This demo doesn't use the camera.`,`本演示不使用摄像头。`,`Cette démo n'utilise pas la caméra.`],
myQrT:[`Mi QR para que me paguen`,`My QR to get paid`,`我的收款二维码`,`Mon QR pour être payé`],myQrTxt:[`Muestra este código para recibir pagos sin comisión.`,`Show this code to receive payments with no fee.`,`出示此码即可零手续费收款。`,`Montrez ce code pour recevoir des paiements sans commission.`],
sentOk:[`¡Pago enviado!`,`Payment sent!`,`付款已发送！`,`Paiement envoyé !`],sentOkS:[`Le pagaste {m} a {n}.`,`You paid {n} {m}.`,`您已向 {n} 支付 {m}。`,`Vous avez payé {m} à {n}.`],
feedT:[`Actividad`,`Activity`,`动态`,`Activité`],you:[`Tú`,`You`,`您`,`Vous`],
rPayAsk:[`¿Confirmas pagar {m} a {n}{w}? Di «sí» para confirmar o «no» para cancelar.`,`Do you confirm paying {m} to {n}{w}? Say “yes” to confirm or “no” to cancel.`,`确认向 {n} 支付 {m}{w}吗？说“是”确认，说“不”取消。`,`Confirmez-vous le paiement de {m} à {n}{w} ? Dites « oui » pour confirmer ou « non » pour annuler.`],
rPayAskNew:[` Ojo: {n} es un contacto nuevo, verifica bien el nombre.`,` Careful: {n} is a new contact, double-check the name.`,` 注意：{n} 是新联系人，请仔细核对姓名。`,` Attention : {n} est un nouveau contact, vérifiez bien le nom.`],
rPayOk:[`Listo, pagaste {m} a {n}.`,`Done, you paid {n} {m}.`,`好了，您已向 {n} 支付 {m}。`,`C'est fait, vous avez payé {m} à {n}.`],
rPayNo:[`Cancelé el pago. No se envió nada.`,`I canceled the payment. Nothing was sent.`,`已取消付款，未发送任何款项。`,`J'ai annulé le paiement. Rien n'a été envoyé.`],
rPayNoFunds:[`Tu saldo ({b}) no alcanza para pagar {m}.`,`Your balance ({b}) isn't enough to pay {m}.`,`您的余额（{b}）不足以支付 {m}。`,`Votre solde ({b}) ne suffit pas pour payer {m}.`],
chip6:[`Paga 200 a Pedro por la renta`,`Pay 200 to Pedro for rent`,`向 Pedro 转账 200 用于房租`,`Paie 200 à Pedro pour le loyer`],
yesB:[`✅ Sí, pagar`,`✅ Yes, pay`,`✅ 是，付款`,`✅ Oui, payer`],noB:[`✖ No`,`✖ No`,`✖ 不`,`✖ Non`],
hiTxt:[`Soy Mati. Te ayudo a cobrar y a pagar sin comisiones, con QR o con tu voz. Toca un botón o háblame.`,`I'm Mati. I help you get paid and pay others with no fees, by QR or voice. Tap a button or talk to me.`,`我是 Mati。我帮您用二维码或语音零手续费收款和付款。点个按钮或直接和我说话。`,`Je suis Mati. Je vous aide à encaisser et à payer sans commission, par QR ou à la voix. Touchez un bouton ou parlez-moi.`],
aHello:[`Hola 👋 Soy Mati, tu asistente de CobroLibre. Puedes escribirme o hablarme. Por ejemplo: "cobra 300 a Juan", "paga 200 a Pedro por la renta" o "¿cuánto vendí hoy?".`,`Hello 👋 I'm Mati, your CobroLibre assistant. You can type or talk to me. For example: "charge 300 to Juan", "pay 200 to Pedro for rent" or "how much did I receive today?".`,`您好 👋 我是 Mati，您的 CobroLibre 助手。可以打字或说话，例如：“向 Juan 收款 300”、“向 Pedro 转账 200 用于房租”或“今天收到多少？”。`,`Bonjour 👋 Je suis Mati, votre assistante CobroLibre. Écrivez ou parlez-moi. Par exemple : « encaisse 300 pour Juan », « paie 200 à Pedro pour le loyer » ou « combien ai-je reçu aujourd'hui ? ».`],
rHelp:[`Puedo:\n• Crear cobros: "cobra 300 a Juan"\n• Pagar a otras personas: "paga 200 a Pedro por la renta" (siempre te pido confirmar)\n• Programar cobros: "cobro mensual de 500 a Rosa"\n• Decirte cuánto has recibido\n• Decirte quién te debe`,`I can:\n• Create charges: "charge 300 to Juan"\n• Pay other people: "pay 200 to Pedro for rent" (I always ask you to confirm)\n• Schedule payments: "monthly charge of 500 to Rosa"\n• Tell you how much you received\n• Tell you who owes you`,`我可以：\n• 创建收款：“向 Juan 收款 300”\n• 向他人付款：“向 Pedro 转账 200 用于房租”（我会先请您确认）\n• 安排定期收款：“向 Rosa 每月收款 500”\n• 告诉您收到了多少\n• 告诉您谁欠您钱`,`Je peux :\n• Créer des paiements à encaisser : « encaisse 300 pour Juan »\n• Payer d'autres personnes : « paie 200 à Pedro pour le loyer » (je demande toujours confirmation)\n• Programmer des paiements : « paiement mensuel de 500 pour Rosa »\n• Vous dire combien vous avez reçu\n• Vous dire qui vous doit de l'argent`],
orgP:[`Para PyMEs de todos los giros: tiendas, fondas, talleres, servicios, turismo y artesanía.`,`For SMEs of every kind: shops, eateries, workshops, services, tourism and crafts.`,`适合各行各业的中小企业：商店、小餐馆、工坊、服务业、旅游和手工艺。`,`Pour les PME de tous secteurs : boutiques, petites tables, ateliers, services, tourisme et artisanat.`],
pvx:[`<b>Cobra y paga con QR, WhatsApp o tu voz, sin comisión por operación.</b> Sobre rieles públicos de Banxico (SPEI/CoDi), sin comisión al comprador ni al comercio según la ATDT. Para PyMEs de todos los giros, en español, inglés, chino y francés.`,`<b>Get paid and pay with QR, WhatsApp or your voice, with no fee per transaction.</b> Built on Banxico's public rails (SPEI/CoDi), which charge neither buyer nor merchant according to ATDT. For SMEs of every kind, in Spanish, English, Chinese and French.`,`<b>用二维码、WhatsApp 或语音收款和付款，每笔零手续费。</b>基于墨西哥央行的公共系统（SPEI/CoDi），据 ATDT 称对买卖双方均不收费。面向各行各业的中小企业，支持西班牙语、英语、中文和法语。`,`<b>Encaissez et payez par QR, WhatsApp ou à la voix, sans commission par opération.</b> Basé sur les rails publics de Banxico (SPEI/CoDi), sans frais pour l'acheteur ni le commerçant selon l'ATDT. Pour les PME de tous secteurs, en espagnol, anglais, chinois et français.`],
pw1:[`Comercios y servicios de todo tipo: tiendas, fondas, estéticas, talleres, consultorios y escuelas.`,`Businesses of every kind: shops, eateries, salons, workshops, clinics and schools.`,`各类商家和服务业：商店、小餐馆、美容院、维修坊、诊所和学校。`,`Commerces et services de tous types : boutiques, petites tables, salons, ateliers, cabinets et écoles.`],
pw2:[`Turismo: agencias de viaje, guías y hospedaje, con mensajes a turistas en su idioma.`,`Tourism: travel agencies, guides and lodging, with messages to tourists in their language.`,`旅游业：旅行社、导游和住宿，用游客的语言发送消息。`,`Tourisme : agences de voyage, guides et hébergements, avec des messages aux touristes dans leur langue.`],
pw3:[`Artesanas y artesanos: talleres, mercados y ferias.`,`Artisans: workshops, markets and fairs.`,`手工艺人：工坊、市集和展会。`,`Artisans : ateliers, marchés et foires.`],
pw4:[`Negocios que pagan a proveedores, empleados y rentas con un QR o con su voz.`,`Businesses that pay suppliers, employees and rent with a QR or their voice.`,`用二维码或语音向供应商、员工支付货款、工资和房租的商家。`,`Entreprises qui paient fournisseurs, employés et loyers par QR ou à la voix.`],
pw5:[`Personas mayores: voz, letra grande y un asistente amable.`,`Older adults: voice, large text and a friendly assistant.`,`老年人：语音、大字体和亲切的助手。`,`Seniors : voix, grands caractères et une assistante aimable.`],
tCat:[`Mis productos y servicios`,`My products & services`,`我的商品与服务`,`Mes produits et services`],kT:[`Mis productos y servicios`,`My products & services`,`我的商品与服务`,`Mes produits et services`],
tp1:[`Servicio`,`Service`,`服务`,`Service`],tp2:[`Producto o artesanía`,`Product or handicraft`,`商品或手工艺品`,`Produit ou artisanat`],tp3:[`Tour, taller o experiencia`,`Tour, workshop or experience`,`行程、工坊或体验`,`Visite, atelier ou expérience`],tp4:[`Comida u hospedaje`,`Food or lodging`,`餐饮或住宿`,`Repas ou hébergement`],
gb:[`Belleza y estética`,`Beauty & salon`,`美容美发`,`Beauté et coiffure`],gm:[`Taller u oficios`,`Workshop or trades`,`维修与手艺工`,`Atelier ou métiers`],ge:[`Educación o clases`,`Education or classes`,`教育或培训`,`Éducation ou cours`],gl:[`Comercio en línea`,`Online shop`,`网店`,`Commerce en ligne`],gp:[`Producción o manufactura`,`Production or manufacturing`,`生产或制造`,`Production ou fabrication`]
});
const tl=(l,k,v)=>{const a=T[k];if(!a)return k;return (a[LI[l]]||a[0]).replace(/\{(\w+)\}/g,(m,x)=>v&&v[x]!=null?v[x]:'')};
const t=(k,v)=>tl(S.lang,k,v);
let S={
  lang:'es',
  biz:{name:'Artesanías Doña Rosa',owner:'Rosa Hernández',registered:false,cel:'55 1234 5678',giro:'ga'},
  charges:[
    {id:1,client:'Juan Pérez',phone:'5511112222',concept:'Rebozo tejido a mano',amount:850,status:'pagado',date:'',lang:'es'},
    {id:2,client:'Emma Johnson',phone:'5533334444',concept:'Taller de alebrijes',amount:600,status:'pendiente',date:'',lang:'en'},
    {id:3,client:'Li Wei',phone:'5555556666',concept:'Recorrido guiado Centro Histórico',amount:450,status:'pagado',date:'',lang:'zh'}
  ],
  rec:[
    {id:1,client:'Casa Sol (renta de local)',amount:1200,freq:'f1',day:5,status:'active'},
    {id:2,client:'Doña Lupita',amount:350,freq:'f3',day:1,status:'active'}
  ],
  cat:[
    {id:1,name:'Recorrido guiado Centro Histórico',price:450,type:'tp3'},
    {id:2,name:'Rebozo tejido a mano',price:850,type:'tp2'},
    {id:3,name:'Taller de alebrijes',price:600,type:'tp3'},
    {id:4,name:'Olla de barro decorada',price:320,type:'tp2'},
    {id:5,name:'Corte y peinado',price:200,type:'tp1'}
  ],
  fx:{USD:18,EUR:21,CNY:2.5},
  pay:[{id:5,to:'Don Pedro',amount:640,note:'Telas',emoji:'🧵',date:''},{id:6,to:'Ana López',amount:1500,note:'Sueldo semanal',emoji:'💼',date:''}],
  contacts:[{id:1,name:'Don Pedro',role:'Proveedor de telas',phone:'5599990001'},{id:2,name:'Ana López',role:'Empleada',phone:'5599990002'},{id:3,name:'Casa Sol',role:'Renta del local',phone:'5599990003'},{id:4,name:'Lupe',role:'Gas y servicios',phone:'5599990004'}],
  draft:null,pstate:'home',pf:null,em:'💸',bal0:3000,
  step:1,view:'inicio',voice:true,seq:10,qr:null,pre:null
};
try{const n=(navigator.language||'es').slice(0,2).toLowerCase();if(LI[n]!=null)S.lang=n}catch(e){}
const mx=n=>n.toLocaleString(LOC[S.lang],{style:'currency',currency:'MXN'});
const today=()=>new Date().toLocaleDateString(LOC[S.lang],{day:'numeric',month:'short'});
S.charges.forEach(c=>c.date=today());S.pay.forEach(c=>c.date=today());
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const paid=()=>S.charges.filter(c=>c.status==='pagado');
const total=a=>a.reduce((s,c)=>s+c.amount,0);
const COMM=0.036*1.16;
const saved=()=>Math.round(total(paid())*COMM*100)/100;

/* ---------- LUPITA e iconos ---------- */
function lupita(o={}){
  const {phone=false,crop=false,cls=''}=o;
  const vb=crop?'46 34 108 124':'0 0 200 240';
  const hair='#1d1420',skin='#E3A97C',pink='#E6007E';
  return `<svg class="${cls}" viewBox="${vb}" role="img" aria-label="Mati" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="52" cy="140" rx="13" ry="17" fill="${hair}"/><ellipse cx="46" cy="168" rx="12" ry="16" fill="${hair}"/><ellipse cx="42" cy="196" rx="11" ry="15" fill="${hair}"/>
  <ellipse cx="148" cy="140" rx="13" ry="17" fill="${hair}"/><ellipse cx="154" cy="168" rx="12" ry="16" fill="${hair}"/><ellipse cx="158" cy="196" rx="11" ry="15" fill="${hair}"/>
  <path d="M30 240C30 186 66 160 100 160s70 26 70 80z" fill="#fff" stroke="#e5ddd0" stroke-width="2"/>
  <path d="M70 168Q100 196 130 168" fill="none" stroke="${pink}" stroke-width="4" stroke-linecap="round"/>
  ${[[78,178],[90,186],[100,189],[110,186],[122,178]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.5" fill="${pink}"/><circle cx="${x}" cy="${y}" r="2" fill="#FFD6EA"/>`).join('')}
  <ellipse cx="84" cy="190" rx="6" ry="2.6" fill="#2e8b57" transform="rotate(35 84 190)"/><ellipse cx="116" cy="190" rx="6" ry="2.6" fill="#2e8b57" transform="rotate(-35 116 190)"/>
  <rect x="90" y="146" width="20" height="20" rx="8" fill="${skin}"/>
  <ellipse cx="100" cy="88" rx="56" ry="58" fill="${hair}"/>
  <ellipse cx="100" cy="104" rx="46" ry="50" fill="${skin}"/>
  <path d="M52 92C56 54 144 54 148 92 132 74 114 70 100 80 86 70 68 74 52 92z" fill="${hair}"/>
  <g fill="${pink}"><path d="M48 100l-15-9v18z"/><path d="M48 100l15-9v18z"/><path d="M152 100l-15-9v18z"/><path d="M152 100l15-9v18z"/></g>
  <circle cx="48" cy="100" r="4" fill="#B0005F"/><circle cx="152" cy="100" r="4" fill="#B0005F"/>
  <circle cx="56" cy="126" r="5.5" fill="${pink}"/><circle cx="144" cy="126" r="5.5" fill="${pink}"/>
  <path d="M71 93Q82 85 93 91M107 91Q118 85 129 93" stroke="${hair}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="82" cy="107" rx="8" ry="10" fill="#3a2212"/><ellipse cx="118" cy="107" rx="8" ry="10" fill="#3a2212"/>
  <circle cx="85" cy="103" r="3" fill="#fff"/><circle cx="121" cy="103" r="3" fill="#fff"/>
  <circle cx="72" cy="124" r="7" fill="#F28B82" opacity=".55"/><circle cx="128" cy="124" r="7" fill="#F28B82" opacity=".55"/>
  <path d="M100 113q-3 6 0 8" stroke="#b9805a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M89 128Q100 141 111 128z" fill="#fff" stroke="#9c2b3a" stroke-width="3" stroke-linejoin="round"/>
  ${phone?`<path d="M170 240L153 229" stroke="${skin}" stroke-width="15" stroke-linecap="round"/>
  <g transform="rotate(-8 150 195)"><rect x="128" y="150" width="46" height="78" rx="9" fill="#232323"/><rect x="132" y="156" width="38" height="66" rx="5" fill="#0B6B4F"/><circle cx="151" cy="180" r="11" fill="#fff"/><path d="M145 180l4 4 8-9" stroke="#0B6B4F" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="138" y="198" width="26" height="5" rx="2.5" fill="#fff" opacity=".85"/><rect x="142" y="207" width="18" height="4" rx="2" fill="#fff" opacity=".6"/></g>
  <circle cx="129" cy="206" r="6" fill="${skin}"/>`:''}
  </svg>`;
}
function ico(n,sz=56){
  const d={
   qr:'<rect x="8" y="8" width="18" height="18" rx="3"/><rect x="38" y="8" width="18" height="18" rx="3"/><rect x="8" y="38" width="18" height="18" rx="3"/><path d="M38 38h7v7h-7zM50 38h6M38 52h6M50 46v10h6"/>',
   cal:'<rect x="8" y="12" width="48" height="44" rx="6"/><path d="M8 26h48M20 6v10M44 6v10M22 41l7 7 13-14"/>',
   chat:'<path d="M10 12h44a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H30L18 54V44h-8a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z"/><path d="M22 28h2M32 28h2M42 28h2"/>',
   clock:'<circle cx="32" cy="32" r="23"/><path d="M32 18v15l10 6"/>',
   store:'<path d="M8 26l4-14h40l4 14zM12 26v6a7 7 0 0 0 13 0 7 7 0 0 0 14 0 7 7 0 0 0 13 0v-6M12 38v18h40V38M26 56V44h12v12"/>',
   send:'<path d="M6 30L58 8 46 56 31 39 6 30zM31 39l27-31"/>',scan:'<path d="M8 22V8h14M42 8h14v14M56 42v14H42M22 56H8V42M8 32h48"/>',info:'<circle cx="32" cy="32" r="23"/><path d="M32 28v16M32 20v2"/>'
  }[n];
  return `<svg width="${sz}" height="${sz}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
}

/* ---------- IMÁGENES MEXICANAS ---------- */
function papel(){
  const col=['#E6007E','#0B6B4F','#F5A300','#1F5FA8','#8E3FA0','#E6007E','#0B6B4F','#F5A300'];
  return `<svg viewBox="0 0 400 50" width="100%" role="img" aria-label="Papel picado de colores" preserveAspectRatio="xMidYMin slice"><path d="M0 5Q200 14 400 5" stroke="#8a6d3b" stroke-width="2" fill="none"/>${col.map((c,i)=>{const x=i*50+5,y=9+Math.sin(i/7*Math.PI)*3;return `<g transform="translate(${x} ${y})"><path d="M0 0h40v28l-5 6-5-6-5 6-5-6-5 6-5-6-5 6-5-6z" fill="${c}"/><circle cx="20" cy="12" r="4" fill="#FFFBF2"/><path d="M8 7l3 3-3 3-3-3zM32 7l3 3-3 3-3-3zM20 21l3 3-3 3-3-3z" fill="#FFFBF2"/></g>`}).join('')}</svg>`;
}
function bandera(w=90){
  return `<svg width="${w}" viewBox="0 0 90 60" role="img" aria-label="Bandera de México"><rect width="90" height="60" rx="4" fill="#fff" stroke="#bbb"/><rect width="30" height="60" rx="4" fill="#006847"/><rect x="60" width="30" height="60" rx="4" fill="#CE1126"/><rect x="26" width="8" height="60" fill="#006847"/><rect x="56" width="8" height="60" fill="#fff"/><circle cx="45" cy="30" r="9.5" fill="#C9A24B"/><path d="M36 33q9 11 18 0" stroke="#006847" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="45" cy="28" r="3.2" fill="#7a4a1a"/></svg>`;
}
let _sid=0;
function sello(w=130){
  const id='cp'+(++_sid);
  const pet=[...Array(10).keys()].map(i=>`<ellipse cx="80" cy="64" rx="6.5" ry="13" fill="#F5A300" transform="rotate(${i*36} 80 80)"/>`).join('');
  return `<svg width="${w}" viewBox="0 0 160 160" role="img" aria-label="Sello: orgullosamente mexicano, hecho con cariño en México"><defs><path id="${id}" d="M80 80m-57 0a57 57 0 1 1 114 0a57 57 0 1 1-114 0"/></defs>
  <circle cx="80" cy="80" r="76" fill="#fff" stroke="#006847" stroke-width="7"/><circle cx="80" cy="80" r="68" fill="none" stroke="#CE1126" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/>
  <text font-size="9.5" font-weight="700" fill="#0B6B4F"><textPath href="#${id}" startOffset="0" textLength="350" lengthAdjust="spacing">HECHO CON CARIÑO EN MÉXICO ★ ORGULLOSAMENTE MEXICANO ★</textPath></text>
  <circle cx="80" cy="80" r="40" fill="#FFF4D6"/>${pet}<circle cx="80" cy="80" r="9" fill="#B34E0A"/></svg>`;
}

function alebrije(){
  return `<g transform="translate(-2 4) scale(.9)"><path d="M12 44c-9-7-6-19 3-21" stroke="#1F5FA8" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="42" cy="48" rx="27" ry="15" fill="#E6007E"/>${[26,36,53,63].map((x,i)=>`<rect x="${x-4}" y="${i%2?58:56}" width="8" height="${i%2?13:15}" rx="3" fill="#F5A300"/>`).join('')}<path d="M20 46q7-8 14 0t14 0t14 0" stroke="#0B6B4F" stroke-width="3" fill="none"/><g fill="#fff"><circle cx="28" cy="53" r="2.4"/><circle cx="40" cy="55" r="2.4"/><circle cx="52" cy="53" r="2.4"/></g><circle cx="68" cy="34" r="13" fill="#F5A300"/><path d="M58 26l-5-13 12 8zM76 25l7-12 1 14z" fill="#0B6B4F"/><circle cx="72" cy="32" r="2.8" fill="#1B1B1B"/><ellipse cx="76" cy="40" rx="5" ry="3.5" fill="#1F5FA8"/><path d="M62 30q3-3 6 0" stroke="#E6007E" stroke-width="2" fill="none"/></g>`;
}
function artesanias(){
  const olla=`<path d="M20 30C8 42 12 68 40 70c28-2 32-28 20-40z" fill="#C8672B"/><path d="M28 30l2-11h20l2 11z" fill="#A9511F"/><ellipse cx="40" cy="19" rx="11" ry="3.5" fill="#7a3a15"/><path d="M14 48q13-7 26 0t26 0" stroke="#fff" stroke-width="3.5" fill="none"/><g fill="#1F5FA8"><circle cx="24" cy="57" r="3"/><circle cx="40" cy="60" r="3"/><circle cx="56" cy="57" r="3"/></g>`;
  const sarape=`<rect x="12" y="14" width="56" height="48" fill="#fff"/><rect x="12" y="14" width="56" height="7" fill="#E6007E"/><rect x="12" y="23" width="56" height="5" fill="#0B6B4F"/><rect x="12" y="30" width="56" height="14" fill="#F5A300"/><path d="M40 31l9 6-9 6-9-6z" fill="#1F5FA8"/><rect x="12" y="46" width="56" height="5" fill="#0B6B4F"/><rect x="12" y="53" width="56" height="9" fill="#E6007E"/>${[...Array(14).keys()].map(i=>`<path d="M${14+i*4} 62v9" stroke="#E6007E" stroke-width="2"/>`).join('')}`;
  const flor=`${[...Array(12).keys()].map(i=>`<ellipse cx="40" cy="22" rx="8" ry="15" fill="${i%2?'#F5A300':'#FFB627'}" transform="rotate(${i*30} 40 40)"/>`).join('')}<circle cx="40" cy="40" r="9" fill="#B34E0A"/>`;
  const somb=`<ellipse cx="40" cy="56" rx="36" ry="11" fill="#C9A24B"/><path d="M24 55C24 22 56 22 56 55z" fill="#D9B45B"/><path d="M24 47h32" stroke="#E6007E" stroke-width="6"/><g fill="#fff"><circle cx="14" cy="58" r="2"/><circle cx="26" cy="64" r="2"/><circle cx="40" cy="66" r="2"/><circle cx="54" cy="64" r="2"/><circle cx="66" cy="58" r="2"/></g>`;
  const f=(g,k)=>`<figure><svg viewBox="0 0 80 80" role="img" aria-label="${esc(t(k))}">${g}</svg><figcaption>${t(k)}</figcaption></figure>`;
  return `<div class="arts">${f(olla,'a1')}${f(sarape,'a2')}${f(flor,'a3')}${f(somb,'a4')}${f(alebrije(),'a5')}</div>`;
}
function orgullo(){
  return `<div class="card orgullo"><div class="orow">${bandera(84)}<div style="flex:1"><h3>${t('orgT')}</h3><p>${t('orgP')}</p></div></div>${artesanias()}<div class="orow" style="justify-content:center;margin-top:10px">${sello(120)}</div><p class="hint">${t('orgHint')}</p></div>`;
}
function guide(x){return `<div class="guide">${lupita({crop:true,cls:'gav'})}<div class="bubble">${x}</div></div>`}
function overlay(html){
  const o=document.createElement('div');o.className='ov';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');
  o.innerHTML=`<div class="ovc">${html}</div>`;document.body.appendChild(o);return o;
}
function celebrate(title,sub){
  const o=overlay(`<div class="pop">${lupita({phone:true,cls:'big'})}</div><div class="ok">✔</div><h2>${esc(title)}</h2><p>${esc(sub||'')}</p><button class="btn" id="ovx">${t('thx')}</button>`);
  const b=o.querySelector('#ovx');b.focus();b.onclick=()=>o.remove();speak(title);
}
function openLang(){
  const o=overlay(`<h2>🌐 ${t('langT')}</h2>${LANGS.map(([c,n])=>`<button class="btn ${c===S.lang?'':'alt'}" data-l="${c}" style="margin:8px 0">${n}</button>`).join('')}`);
  o.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{S.lang=b.dataset.l;o.remove();render()});
  o.querySelector('[data-l]').focus();
}
function alert2(x){const d=document.createElement('div');d.className='notice';d.setAttribute('role','alert');d.textContent=x;$('#app').prepend(d);setTimeout(()=>d.remove(),4000)}

/* ---------- voz ---------- */
function pickVoice(l){
  if(!window.speechSynthesis)return null;
  const vs=speechSynthesis.getVoices();if(!vs.length)return null;
  const code=LOC[l];const pre=l;
  const exact=vs.filter(v=>v.lang.replace('_','-').toLowerCase()===code.toLowerCase());
  const same=vs.filter(v=>v.lang.toLowerCase().startsWith(pre));
  const pref=/paulina|sabina|dalia|marisol|mónica|monica|google|natural|female|mujer|samantha|amelie|amélie|thomas|ting|mei|xiaoxiao|denise|elsa/i;
  const pool=exact.length?exact:same;
  return pool.find(v=>pref.test(v.name))||pool[0]||null;
}
try{if(window.speechSynthesis){speechSynthesis.onvoiceschanged=()=>{};speechSynthesis.getVoices()}}catch(e){}
function speak(x){
  if(!S.voice||!window.speechSynthesis)return;
  try{const u=new SpeechSynthesisUtterance(x);const v=pickVoice(S.lang);if(v)u.voice=v;u.lang=(v&&v.lang)||LOC[S.lang];u.rate=.88;u.pitch=1.1;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}
}

/* ---------- vistas ---------- */
const view=v=>{S.view=v;render()};
function tile(c,tt,icn,k,go){return `<button class="tile" style="--tc:${c};--tt:${tt}" data-go="${go}">${ico(icn,60)}<b>${t(k)}</b><span>${t(k+'S')}</span></button>`}
function vInicio(){
  const nm=S.biz.owner.split(' ')[0];
  return `<div class="hero">${lupita({phone:true,cls:'hv'})}<div class="bubble"><b>${esc(t('hi',{n:nm}))}</b><br>${t('hiTxt')}<br><button class="btn alt sm" id="hear" style="margin-top:8px">${t('hear')}</button></div></div>
  ${S.biz.registered?'':`<div class="card" style="border-color:var(--g)"><h3>${ico('store',34)} ${t('reg1')}</h3><p>${t('reg2')}</p><button class="btn" id="goReg">${t('regBtn')}</button></div>`}
  <div class="card money"><div>${t('got')}</div><div class="big">${mx(total(paid()))}</div>
    <p>💚 ${t('saved')} <b style="color:var(--g)">${mx(saved())}</b></p><p class="hint">${t('savedHint')}</p></div>
  <div class="grid2">
    ${tile('#0B6B4F','#fff','qr','tCobrar','cobrar')}
    ${tile('#1F5FA8','#fff','send','tPagar','pagar')}
    ${tile('#0E6E7E','#fff','scan','tScan','pagar-scan')}
    ${tile('#B34E0A','#fff','chat','tLup','asistente')}
    ${tile('#3F4FA0','#fff','cal','tMens','recurrentes')}
    ${tile('#8E3FA0','#fff','store','tCat','catalogo')}
  </div>
  <div class="card" style="margin-top:14px"><h3>${t('upc')}</h3>${S.rec.filter(r=>r.status==='active').map(r=>`<div class="item"><div><b>${esc(r.client)}</b><br>${t(r.freq)}</div><b>${mx(r.amount)}</b></div>`).join('')||`<p>${t('noRec')}</p>`}</div>${orgullo()}`;
}
function bindInicio(){
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{if(b.dataset.go==='pagar-scan'){S.pstate='scan';view('pagar')}else view(b.dataset.go)});
  const g=$('#goReg');if(g)g.onclick=()=>{S.step=1;view('registro')};
  const h=$('#hear');if(h)h.onclick=()=>{S.voice=true;speak(t('hi',{n:S.biz.owner.split(' ')[0]})+' '+t('hiTxt'));render()};
}
function vReg(){
  const st=S.step;
  const bar=`<div class="steps" aria-hidden="true">${[1,2,3].map(i=>`<span class="${i<=st?'on':''}"></span>`).join('')}</div><p><b>${t('step',{a:st})}</b></p>`;
  const G=['ga','gv','gg','gh','gr','gt','gb','gm','ge','gl','gp','gs','go'];
  let body;
  if(st===1)body=`<h2>${t('r1')}</h2>${bar}<div class="card">
   <label for="n">${t('bName')}</label><input id="n" value="${esc(S.biz.name)}">
   <label for="o">${t('bOwner')}</label><input id="o" value="${esc(S.biz.owner)}">
   <label for="g">${t('bGiro')}</label><select id="g">${G.map(x=>`<option value="${x}" ${x===S.biz.giro?'selected':''}>${t(x)}</option>`).join('')}</select>
   <label for="c">${t('bCel')}</label><input id="c" inputmode="tel" value="${esc(S.biz.cel)}"><p class="hint">${t('rfc')}</p></div><button class="btn" id="nx">${t('next')}</button>`;
  else if(st===2)body=`<h2>${t('r2')}</h2>${bar}<div class="card">
   <label for="cu">${t('curp')}</label><input id="cu" maxlength="18" autocapitalize="characters"><p class="hint">${t('curpHint')}</p>
   <label for="cd">${t('code')}</label><input id="cd" inputmode="numeric" maxlength="6"></div>
   <div class="row"><button class="btn alt" id="bk">${t('back')}</button><button class="btn" id="nx">${t('next')}</button></div>`;
  else body=`<h2>${t('r3')}</h2>${bar}<div class="card"><label for="cl">${t('clabe')}</label><input id="cl" inputmode="numeric" maxlength="18"><p class="hint">${t('clabeHint')}</p></div>
   <div class="row"><button class="btn alt" id="bk">${t('back')}</button><button class="btn" id="fin">${t('finish')}</button></div>`;
  return guide(t('g'+st))+body;
}
function bindReg(){
  const nx=$('#nx'),bk=$('#bk'),fin=$('#fin');
  if(bk)bk.onclick=()=>{S.step--;render()};
  if(nx)nx.onclick=()=>{if(S.step===1){S.biz.name=$('#n').value.trim()||S.biz.name;S.biz.owner=$('#o').value.trim()||S.biz.owner;S.biz.giro=$('#g').value;S.biz.cel=$('#c').value}S.step++;render()};
  if(fin)fin.onclick=()=>{S.biz.registered=true;view('inicio');celebrate(t('done'),t('doneS'))};
}
function vCobrar(){
  const p=S.pre||{};S.pre=null;
  return guide(t('gC'))+`<h2>${t('cT')}</h2><div class="card">
   ${S.cat.length?`<label>${t('cPick')}</label><div class="chips" id="kchips">${S.cat.map(k=>`<button type="button" data-k="${k.id}">${esc(k.name)} · ${mx(k.price)}</button>`).join('')}</div>`:''}
   <label for="cn">${t('cName')}</label><input id="cn">
   <label for="cp">${t('cPhone')}</label><input id="cp" inputmode="tel">
   <label for="cm">${t('cAmt')}</label><input id="cm" inputmode="decimal" value="${p.amount||''}">
   <div id="apx" class="hint"></div>
   <label for="cc">${t('cWhy')}</label><input id="cc" value="${esc(p.concept||'')}">
   <label for="cl">${t('cLang')}</label><select id="cl">${LANGS.map(([c,n])=>`<option value="${c}" ${c===S.lang?'selected':''}>${n}</option>`).join('')}</select>
   <label>${t('fxT')}</label><div class="row" style="gap:6px">${['USD','EUR','CNY'].map(c=>`<div><span class="hint">${c}</span><input data-fx="${c}" inputmode="decimal" value="${S.fx[c]}"></div>`).join('')}</div>
   <p class="hint">${t('touristNote')}</p>
   <div style="margin-top:14px"><button class="btn" id="mk">${t('cMk')}</button></div></div>
   <div id="res">${S.qr?qrCard(S.qr):''}</div>
   <div class="card"><h3>${t('myCh')}</h3>${S.charges.slice().reverse().map(c=>`<div class="item"><div><b>${esc(c.client)}</b> · ${mx(c.amount)}<br><span class="hint">${esc(c.concept)} · ${c.date}</span></div><div><span class="tag ${c.status==='pagado'?'t-ok':'t-pe'}">${c.status==='pagado'?t('paidT'):t('pendT')}</span></div></div>`).join('')}</div>`;
}
function qrCard(c){
  const msg=encodeURIComponent(tl(c.lang,'wm',{c:c.client,m:mx(c.amount),w:c.concept,b:S.biz.name,id:c.id}));
  return `<div class="card" style="border-color:var(--g)"><h3>${t('qrReady',{m:mx(c.amount)})}</h3>
  <canvas id="qr" width="260" height="260" aria-label="QR"></canvas><p class="hint">${t('qrHint')}</p>
  <div class="row"><a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/${c.phone.replace(/\D/g,'').length===10?'52':''}${c.phone.replace(/\D/g,'')}?text=${msg}">${t('sendWA')}</a>
  <button class="btn alt" id="sim">${t('simPay')}</button></div></div>`;
}
function drawQR(txt){
  const cv=$('#qr');if(!cv)return;const ctx=cv.getContext('2d'),N=25,z=cv.width/N;
  let h=2166136261;for(const ch of txt){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}
  const rnd=()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return (h>>>0)/4294967296};
  ctx.fillStyle='#fff';ctx.fillRect(0,0,cv.width,cv.height);ctx.fillStyle='#000';
  const fin=(x,y)=>{ctx.fillRect(x*z,y*z,7*z,7*z);ctx.fillStyle='#fff';ctx.fillRect((x+1)*z,(y+1)*z,5*z,5*z);ctx.fillStyle='#000';ctx.fillRect((x+2)*z,(y+2)*z,3*z,3*z)};
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){if((x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9))continue;if(rnd()>.5)ctx.fillRect(x*z,y*z,z,z)}
  fin(0,0);fin(N-7,0);fin(0,N-7);
}
function apx(){
  const el=$('#apx');if(!el)return;const a=parseFloat(String($('#cm').value).replace(',','.'));
  if(!(a>0)){el.textContent='';return}
  const f=(c)=>(a/(parseFloat(S.fx[c])||1)).toFixed(2);
  el.innerHTML=`${t('approx')} <b>USD ${f('USD')}</b> · <b>EUR ${f('EUR')}</b> · <b>CNY ${f('CNY')}</b>`;
}
function bindCobrar(){
  if(S.qr)drawQR('CL'+S.qr.id+S.qr.amount);
  apx();
  $('#cm').oninput=apx;
  document.querySelectorAll('[data-fx]').forEach(i=>i.oninput=()=>{S.fx[i.dataset.fx]=parseFloat(String(i.value).replace(',','.'))||S.fx[i.dataset.fx];apx()});
  document.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=S.cat.find(x=>x.id==b.dataset.k);$('#cc').value=k.name;$('#cm').value=k.price;apx()});
  $('#mk').onclick=()=>{
    const amount=parseFloat(String($('#cm').value).replace(',','.'));const client=$('#cn').value.trim();
    if(!client||!(amount>0)){speak(t('miss'));alert2(t('miss'));return}
    const c={id:S.seq++,client,phone:$('#cp').value||'5500000000',concept:$('#cc').value.trim()||t('cT'),amount,status:'pendiente',date:today(),lang:$('#cl').value};
    S.charges.push(c);S.qr=c;render();
  };
  const s=$('#sim');if(s)s.onclick=()=>{const c=S.qr;c.status='pagado';S.qr=null;render();celebrate(t('payRecv'),t('payRecvS',{c:c.client,m:mx(c.amount)}))};
}
function vCat(){
  const T4=['tp1','tp2','tp3','tp4'];
  return guide(t('kG'))+`<h2>${t('kT')}</h2>
  <div class="card">${S.cat.map(k=>`<div class="item"><div><b>${esc(k.name)}</b><br><span class="hint">${t(k.type)} · ${mx(k.price)}</span></div><div class="row" style="flex:0 1 220px"><button class="btn sm" data-c="${k.id}">${t('kCharge')}</button><button class="btn sm alt" data-d="${k.id}">${t('kDel')}</button></div></div>`).join('')||`<p>${t('kEmpty')}</p>`}</div>
  <div class="card"><h3>${t('kAdd')}</h3>
   <label for="kn">${t('kName')}</label><input id="kn">
   <label for="kp">${t('kPrice')}</label><input id="kp" inputmode="decimal">
   <label for="kt">${t('kType')}</label><select id="kt">${T4.map(x=>`<option value="${x}">${t(x)}</option>`).join('')}</select>
   <div style="margin-top:14px"><button class="btn" id="ka">${t('kAdd')}</button></div></div>`;
}
function bindCat(){
  $('#ka').onclick=()=>{const n=$('#kn').value.trim(),p=parseFloat(String($('#kp').value).replace(',','.'));if(!n||!(p>0)){alert2(t('miss'));return}S.cat.push({id:S.seq++,name:n,price:p,type:$('#kt').value});render()};
  document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const k=S.cat.find(x=>x.id==b.dataset.c);S.pre={concept:k.name,amount:k.price};view('cobrar')});
  document.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{S.cat=S.cat.filter(x=>x.id!=b.dataset.d);render()});
}
function vRec(){
  const st=r=>r.status==='active'?['t-ok','sActive']:r.status==='paused'?['t-pa','sPaused']:['t-pe','sWait'];
  return guide(t('mG'))+`<h2>${t('mT')}</h2><div class="notice">${t('mN')}</div>
  <div class="card"><h3>${t('mProg')}</h3>
   <label for="rc">${t('cust')}</label><input id="rc">
   <label for="rm">${t('cAmt')}</label><input id="rm" inputmode="decimal">
   <label for="rf">${t('mEvery')}</label><select id="rf">${['f1','f2','f3'].map(f=>`<option value="${f}">${t(f)}</option>`).join('')}</select>
   <label for="rd">${t('mDay')}</label><input id="rd" inputmode="numeric" value="1">
   <div style="margin-top:14px"><button class="btn" id="ra">${t('mAsk')}</button></div></div>
  <div class="card"><h3>${t('mMy')}</h3>${S.rec.map(r=>{const [cl,lb]=st(r);return `<div class="item"><div><b>${esc(r.client)}</b> · ${mx(r.amount)}<br><span class="hint">${t(r.freq)}, ${t('dayN',{d:r.day})}</span><br><span class="tag ${cl}">${t(lb)}</span></div>
   <div class="row" style="flex:0 1 240px">${r.status==='wait'?`<button class="btn sm" data-a="ok" data-i="${r.id}">${t('simAuth')}</button>`:''}${r.status==='active'?`<button class="btn sm" data-a="run" data-i="${r.id}">${t('chToday')}</button><button class="btn sm alt" data-a="pause" data-i="${r.id}">${t('pause')}</button>`:''}${r.status==='paused'?`<button class="btn sm alt" data-a="resume" data-i="${r.id}">${t('resume')}</button>`:''}</div></div>`}).join('')||`<p>${t('noRec')}</p>`}</div>`;
}
function bindRec(){
  $('#ra').onclick=()=>{
    const amount=parseFloat(String($('#rm').value).replace(',','.')),client=$('#rc').value.trim(),day=Math.min(28,Math.max(1,parseInt($('#rd').value)||1));
    if(!client||!(amount>0)){alert2(t('miss'));return}
    S.rec.push({id:S.seq++,client,amount,freq:$('#rf').value,day,status:'wait'});render();
  };
  document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{
    const r=S.rec.find(x=>x.id==b.dataset.i),a=b.dataset.a;
    if(a==='ok'||a==='resume')r.status='active';
    if(a==='pause')r.status='paused';
    if(a==='run')S.charges.push({id:S.seq++,client:r.client,phone:'',concept:t('conceptRec'),amount:r.amount,status:'pagado',date:today(),lang:S.lang});
    render();
  });
}
let chat=[];
function vAsist(){
  const msgs=[{w:'bot',t:t('aHello')},...chat];
  return `<h2>${t('aT')}</h2><p class="hint">${t('aHint')}</p>
  <div class="wa-box"><div class="wa-head"><span class="wh">${lupita({crop:true,cls:'hav2'})}<span>Mati · CobroLibre<small>${t('online')}</small></span></span></div><div id="chat" role="log" aria-live="polite">${msgs.map(m=>m.w==='bot'?`<div class="brow">${lupita({crop:true,cls:'cav'})}<div class="msg bot">${esc(m.t)}</div></div>`:`<div class="msg me">${esc(m.t)}</div>`).join('')}</div>
  <div class="wa-in"><input id="q" placeholder="${t('ph')}" aria-label="${t('ph')}"><button id="mic" aria-label="${t('micL')}">🎤</button><button id="snd" aria-label="${t('sndL')}">➤</button></div></div>
  <div class="chips">${[1,2,3,4,5,6].map(i=>`<button>${t('chip'+i)}</button>`).join('')}</div>
  ${S.draft?`<div class="card" style="border-color:#1F5FA8"><p><b>${esc(S.draft.emoji)} ${mx(S.draft.amount)} → ${esc(S.draft.to)}</b></p><div class="row"><button class="btn" id="yb">${t('yesB')}</button><button class="btn alt" id="nb">${t('noB')}</button></div></div>`:''}
  <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="vz" style="width:30px;min-height:30px" ${S.voice?'checked':''}> ${t('voiceRead')}</label>`;
}
function bindAsist(){
  const c=$('#chat');c.scrollTop=c.scrollHeight;
  const yb=$('#yb'),nb=$('#nb');
  if(yb)yb.onclick=()=>{chat.push({w:'me',t:t('yesB').replace(/^\S+\s/,'')});const r=reply('si');chat.push({w:'bot',t:r});speak(r);render()};
  if(nb)nb.onclick=()=>{chat.push({w:'me',t:t('noB').replace(/^\S+\s/,'')});const r=reply('no');chat.push({w:'bot',t:r});speak(r);render()};
  const send=x=>{x=(x||$('#q').value).trim();if(!x)return;chat.push({w:'me',t:x});const r=reply(x);chat.push({w:'bot',t:r});speak(r);render()};
  $('#snd').onclick=()=>send();
  $('#q').onkeydown=e=>{if(e.key==='Enter')send()};
  document.querySelectorAll('.chips button').forEach(b=>b.onclick=()=>send(b.textContent));
  $('#vz').onchange=e=>{S.voice=e.target.checked;render();if(S.voice)speak(t('voiceOn'))};
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  $('#mic').onclick=()=>{
    if(!SR){alert2(t('micNo'));return}
    try{const r=new SR();r.lang=LOC[S.lang];const m=$('#mic');m.classList.add('listening');
      r.onresult=e=>{send(e.results[0][0].transcript)};r.onend=()=>m.classList.remove('listening');r.onerror=()=>{m.classList.remove('listening');alert2(t('micErr'))};r.start()}
    catch(e){alert2(t('micNo'))}
  };
}
function reply(x){
  const q=x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const num=(q.match(/(\d+(?:[.,]\d+)?)/)||[])[1];const amount=num?parseFloat(num.replace(',','.')):0;
  const nm=(x.match(/(?:\b(?:a|to|for|pour)|\sà|给|向|對|对)\s*([A-ZÁÉÍÓÚÑÀ-Ý][A-Za-zÀ-ÿ]+(?:\s[A-ZÁÉÍÓÚÑÀ-Ý][A-Za-zÀ-ÿ]+)?)/)||[])[1];
  const RECW=/mensual|semanal|quincenal|recurrente|suscripcion|monthly|weekly|biweekly|recurring|mensuel|hebdomadaire|bimensuel|每月|每周|每週|月付|定期/;
  const CHW=/cobra|cobrar|cobrale|cargale|charge|bill|facture|encaisse|encaisser|收款|收费/;
  const YES=/^(si|claro|confirmo|confirmar|dale|ok|okay|yes|yep|sure|confirm|oui|d.?accord|confirme)\b|^(是|好|确认|对)/;
  const NOW=/^(no|cancela|cancelar|cancel|nope|non|annule|annuler|stop)\b|^(不|取消|别)/;
  if(S.draft&&YES.test(q)){const d=S.draft;S.draft=null;if(!doPay(d))return t('rPayNoFunds',{b:mx(bal()),m:mx(d.amount)});return t('rPayOk',{m:mx(d.amount),n:d.to})}
  if(S.draft&&NOW.test(q)){S.draft=null;return t('rPayNo')}
  if(RECW.test(q)&&amount&&nm){
    const f=/semanal|weekly|hebdomadaire|每周|每週/.test(q)?'f3':/quincenal|biweekly|bimensuel|每两周/.test(q)?'f2':'f1';
    S.rec.push({id:S.seq++,client:nm,amount,freq:f,day:1,status:'wait'});
    return t('rRec',{n:nm,m:mx(amount),f:t(f)});
  }
  if(CHW.test(q)&&amount&&nm){
    S.charges.push({id:S.seq++,client:nm,phone:'',concept:t('conceptBot'),amount,status:'pendiente',date:today(),lang:S.lang});
    return t('rCharge',{m:mx(amount),n:nm});
  }
  const PAYW=/\bpaga\b|\bpagar\b|pagale|\bmanda\b|\benvia\b|transfiere|\bpay\b|\bsend\b|transfer|\bpaie\b|\bpayer\b|\benvoie\b|\bvirer?\b|付款|支付|转账|汇款/;
  if(PAYW.test(q)&&amount&&nm){
    const mm=x.match(/(?:\bpor\b|\bfor\b|\bpour\b|用于|为了)\s*(?:la |el |los |las |the |le |la |l')?(.+)$/i);
    const note=mm?mm[1].trim():'';
    const known=S.contacts.find(c=>c.name.toLowerCase().includes(nm.toLowerCase()));
    if(amount>bal())return t('rPayNoFunds',{b:mx(bal()),m:mx(amount)});
    S.draft={to:known?known.name:nm,amount,note,emoji:emojiFor(note),isNew:!known};
    const WP={es:p=>' por '+p,en:p=>' for '+p,zh:p=>'（用途：'+p+'）',fr:p=>' pour '+p};
    return t('rPayAsk',{m:mx(amount),n:S.draft.to,w:note?WP[S.lang](note):''})+(S.draft.isNew?t('rPayAskNew',{n:S.draft.to}):'');
  }
  if(/mensual|recurrente|programad|monthly|recurring|scheduled|mensuel|programm|月付|定期|每月/.test(q)){const a=S.rec.filter(r=>r.status==='active');return a.length?t('rRecList')+'\n'+a.map(r=>`• ${r.client}: ${mx(r.amount)} (${t(r.freq)})`).join('\n'):t('rRecNone')}
  if(/debe|pendiente|falta|owe|pending|unpaid|doit|impay|attente|欠|未付|待收/.test(q)){const p=S.charges.filter(c=>c.status==='pendiente');return p.length?t('rDebt',{k:p.length,m:mx(total(p))})+'\n'+p.map(c=>`• ${c.client}: ${mx(c.amount)}`).join('\n'):t('rDebtNone')}
  if(/vend|cobr|recib|gane|dinero|cuanto|sold|received|earn|money|how much|combien|recu|argent|收入|收到|赚|多少/.test(q))return t('rGot',{m:mx(total(paid())),k:paid().length,s:mx(saved())});
  if(/ayuda|que puedes|como|help|aide|帮助|幫助|怎么/.test(q))return t('rHelp');
  return t('rUnk');
}
function vProy(){
  return `<h2>${t('pT')}</h2>
  <div class="card"><h3>${t('pv')}</h3><p>${t('pvx')}</p></div>
  <div class="card"><h3>${t('pw')}</h3><ul style="padding-left:1.1em;margin:.2em 0">${[1,2,3,4,5].map(i=>`<li>${t('pw'+i)}</li>`).join('')}</ul></div>
  <div class="card"><h3>${t('pc')}</h3><p>${t('pcx')}</p></div>
  <div class="card"><h3>${t('pl')}</h3><p>${t('plx')}</p></div>
  <div class="card"><h3>${t('pk')}</h3><table><tr><th>${t('thWho')}</th><th>${t('thWhat')}</th></tr>
   <tr><td>Clip, Mercado Pago, POS</td><td>${t('pk1')}</td></tr><tr><td>CoDi / DiMo</td><td>${t('pk2')}</td></tr><tr><td><b>CobroLibre</b></td><td>${t('pk3')}</td></tr></table></div>
  <div class="card"><h3>${t('cpT')}</h3><p class="hint">${t('cpH')}</p>
   ${[['#0B6B4F','c1'],['#1F5FA8','c2'],['#B34E0A','c3'],['#FFD166','c4'],['#E6007E','c5']].map(([c,k])=>`<div class="item"><span class="sw" style="background:${c}"></span><div style="flex:1">${t(k)}</div></div>`).join('')}
   <p class="hint">${t('cpF')}</p></div>
  ${orgullo()}<div class="notice">${t('proto')}</div>`;
}


function bal(){return S.bal0+total(paid())-total(S.pay)}
function av(n,sz=46){const cols=['#0B6B4F','#1F5FA8','#B34E0A','#8E3FA0','#0E6E7E','#C2185B'];let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))>>>0;return `<span class="av" style="background:${cols[h%cols.length]};width:${sz}px;height:${sz}px;line-height:${sz}px;font-size:${Math.round(sz*.45)}px">${esc(n.trim().charAt(0).toUpperCase())}</span>`}
const EMO=['🧵','💼','🏠','💡','🛒','🎁','💸'];
function emojiFor(n){n=(n||'').toLowerCase();return /renta|rent|loyer|房租|租/.test(n)?'🏠':/sueldo|nomina|nómina|salary|wage|salaire|工资|薪/.test(n)?'💼':/tela|material|supplies|matos|matériel|materiel|材料|原料|compra|proveedor/.test(n)?'🧵':/luz|gas|agua|electric|servicio|service|电|水|煤/.test(n)?'💡':'💸'}
function doPay(d){
  if(d.amount>bal())return false;
  S.pay.push({id:S.seq++,to:d.to,amount:d.amount,note:d.note,emoji:d.emoji,date:today()});
  if(!S.contacts.find(c=>c.name.toLowerCase()===d.to.toLowerCase()))S.contacts.push({id:S.seq++,name:d.to,role:d.role||'',phone:d.phone||''});
  return true;
}
function feedCard(){
  const items=[...S.pay.map(p=>({id:p.id,out:true,who:p.to,amt:p.amount,note:p.note,e:p.emoji,date:p.date})),...paid().map(c=>({id:c.id,out:false,who:c.client,amt:c.amount,note:c.concept,e:'💚',date:c.date}))].sort((a,b)=>b.id-a.id).slice(0,8);
  return `<div class="card"><h3>${t('feedT')}</h3>${items.map(i=>`<div class="item">${av(i.who,40)}<div style="flex:1;min-width:140px"><b>${i.out?esc(t('you'))+' → '+esc(i.who):esc(i.who)+' → '+esc(t('you'))}</b><br><span class="hint">${i.e} ${esc(i.note||'')} · ${i.date}</span></div><b style="color:${i.out?'#1F5FA8':'#0B6B4F'}">${i.out?'−':'+'}${mx(i.amt)}</b></div>`).join('')}</div>`;
}
function vPagar(){
  if(S.draft)return vConfirm();
  if(S.pstate==='scan')return vScan();
  if(S.pstate==='myqr')return vMyQr();
  const f=S.pf;
  const form=f?`<div class="card" style="border-color:#1F5FA8"><h3>${f.isNew?t('addC'):esc(f.name)}</h3>
   ${f.isNew?`<label for="fn">${t('cnName')}</label><input id="fn"><label for="fp">${t('cnPhone')}</label><input id="fp" inputmode="tel"><label for="fr">${t('cnRole')}</label><input id="fr">`:''}
   <label for="fa">${t('cAmt')}</label><input id="fa" class="payamt" inputmode="decimal">
   <label>${t('pNote')}</label><div class="emo">${EMO.map(e=>`<button type="button" data-e="${e}" class="${e===S.em?'on':''}" aria-label="${e}">${e}</button>`).join('')}</div>
   <input id="fo" aria-label="${t('pNote')}">
   <div class="row" style="margin-top:12px"><button class="btn alt" id="fcancel">${t('cancel')}</button><button class="btn" id="fgo">${t('next')}</button></div></div>`:'';
  return guide(t('pgG'))+`<h2>${t('pgT')}</h2>
  <div class="card money"><div>${t('bal')}</div><div class="big" style="color:#1F5FA8">${mx(bal())}</div></div>
  <div class="row3"><button class="btn" id="pscan" style="background:#0E6E7E">${t('btnScan')}</button><button class="btn" id="pvoice" style="background:#B34E0A">${t('btnVoice')}</button><button class="btn alt" id="pmyqr">${t('btnMyQr')}</button></div>
  <div class="card" style="margin-top:14px"><h3>${t('whoPay')}</h3><div class="contacts">${S.contacts.map(c=>`<button class="ct" data-ct="${c.id}">${av(c.name,54)}<b>${esc(c.name)}</b><span>${esc(c.role||'')}</span></button>`).join('')}<button class="ct" data-ct="new"><span class="av add">＋</span><b>${t('addC')}</b></button></div></div>
  ${form}${feedCard()}`;
}
function vScan(){
  return `<h2>${t('scanT')}</h2><p>${t('scanTxt')}</p>
  <div class="viewfinder" aria-hidden="true"><svg viewBox="0 0 200 200"><path d="M20 60V20h40M140 20h40v40M180 140v40h-40M60 180H20v-40" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/></svg><div class="scanline"></div></div>
  <p class="hint">${t('scanNote')}</p>
  <div class="row"><button class="btn alt" id="scancel">${t('cancel')}</button><button class="btn" id="sscan">${t('scanSim')}</button></div>`;
}
function vMyQr(){
  return `<h2>${t('myQrT')}</h2><div class="card" style="text-align:center"><div class="orow" style="justify-content:center">${av(S.biz.name,48)}<b style="font-size:1.2rem">${esc(S.biz.name)}</b></div>
  <canvas id="qr" width="260" height="260" aria-label="QR" style="margin:12px auto;display:block"></canvas><p>${t('myQrTxt')}</p><p class="hint">${t('qrHint')}</p></div>
  <button class="btn alt" id="mback">${t('back')}</button>`;
}
function vConfirm(){
  const d=S.draft,short=d.amount>bal();
  return guide(t('confTip'))+`<div class="card" style="border-color:#1F5FA8;text-align:center"><div>${t('confT')}</div><div class="big" style="color:#1F5FA8">${mx(d.amount)}</div><div>${t('confTo')}</div>
  <div class="orow" style="justify-content:center;margin:6px 0">${av(d.to,56)}<b style="font-size:1.3rem">${esc(d.to)}</b></div><p>${d.emoji} ${esc(d.note||'')}</p>
  ${d.isNew?`<div class="notice">${t('newWarn')}</div>`:''}${short?`<div class="notice" role="alert">${t('noFunds')}</div>`:''}
  <button class="btn" id="cok" ${short?'disabled':''}>${t('confBtn')}</button><button class="btn alt" id="cno" style="margin-top:10px">${t('cancel')}</button></div>`;
}
function bindPagar(){
  const on=(id,fn)=>{const e=$(id);if(e)e.onclick=fn};
  on('#pscan',()=>{S.pstate='scan';render()});
  on('#pvoice',()=>{view('asistente');setTimeout(()=>{try{$('#mic').click()}catch(e){}},60)});
  on('#pmyqr',()=>{S.pstate='myqr';render()});
  on('#mback',()=>{S.pstate='home';render()});
  on('#scancel',()=>{S.pstate='home';render()});
  on('#sscan',()=>{S.draft={to:'Panadería La Esperanza',amount:230,note:'Compra',emoji:'🛒',isNew:true,via:'qr'};render()});
  on('#cno',()=>{S.draft=null;S.pstate='home';render()});
  on('#cok',()=>{const d=S.draft;if(!doPay(d)){alert2(t('noFunds'));return}S.draft=null;S.pf=null;S.pstate='home';render();celebrate(t('sentOk'),t('sentOkS',{m:mx(d.amount),n:d.to}))});
  document.querySelectorAll('[data-ct]').forEach(b=>b.onclick=()=>{
    if(b.dataset.ct==='new')S.pf={isNew:true};else{const c=S.contacts.find(x=>x.id==b.dataset.ct);S.pf={name:c.name,id:c.id,isNew:false}}
    render();const a=$('#fa');if(a)a.scrollIntoView({block:'center'});
  });
  document.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{S.em=b.dataset.e;document.querySelectorAll('[data-e]').forEach(x=>x.classList.toggle('on',x===b))});
  on('#fcancel',()=>{S.pf=null;render()});
  on('#fgo',()=>{
    const f=S.pf;const amount=parseFloat(String($('#fa').value).replace(',','.'));
    const name=f.isNew?$('#fn').value.trim():f.name;
    if(!name||!(amount>0)){alert2(t('miss'));return}
    S.draft={to:name,amount,note:$('#fo').value.trim(),emoji:S.em,isNew:!!f.isNew,phone:f.isNew?$('#fp').value:'',role:f.isNew?$('#fr').value:''};
    render();
  });
  if($('#qr'))drawQR('MI'+S.biz.name);
}

const VIEWS={inicio:vInicio,cobrar:vCobrar,recurrentes:vRec,asistente:vAsist,proyecto:vProy,registro:vReg,catalogo:vCat,pagar:vPagar};
const BINDS={inicio:bindInicio,cobrar:bindCobrar,recurrentes:bindRec,asistente:bindAsist,registro:bindReg,catalogo:bindCat,pagar:bindPagar};
function render(){
  document.documentElement.lang=S.lang;
  $('#sub').textContent=S.biz.registered?S.biz.name:t('sub');
  $('#hav').innerHTML=lupita({crop:true});
  $('#vz2').textContent=S.voice?'🔊':'🔇';
  $('#lg').textContent='🌐 '+S.lang.toUpperCase();
  const NAV=[['inicio','🏠','nInicio'],['cobrar','💵','nCobrar'],['pagar','📤','nPagar'],['asistente','💬','nAyuda'],['proyecto','📋','nProy']];
  const cur=(S.view==='catalogo'||S.view==='recurrentes')?'cobrar':S.view==='registro'?'inicio':S.view;
  $('nav').innerHTML=NAV.map(([v,i,k])=>`<button data-v="${v}" aria-current="${v===cur?'page':'false'}"><span class="i">${i}</span>${t(k)}</button>`).join('');
  document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>view(b.dataset.v));
  $('#app').innerHTML=`<div class="pp">${papel()}</div><div class="greca"></div>`+VIEWS[S.view]();
  (BINDS[S.view]||(()=>{}))();
  window.scrollTo(0,0);
}
$('#lg').onclick=openLang;
$('#vz2').onclick=()=>{S.voice=!S.voice;if(S.voice)speak(t('voiceOn'));else{try{speechSynthesis.cancel()}catch(e){}}render()};
let fsIdx=0;$('#fsz').onclick=()=>{const sz=[20,24,28];fsIdx=(fsIdx+1)%3;document.documentElement.style.setProperty('--fs',sz[fsIdx]+'px')};
render();
