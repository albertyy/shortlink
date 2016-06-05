
设计思路：
设计一个短地址转换网站来实现以下功能：
1.将任意一个长网址转化成一个路径部分只包含5位数字+字母的短网址

实现：在这里我自己设计了转化规则，先对用户的输入的网站进行编码（10进制，从0开始），之后根据我设定好的map字符转化为62进制编码，这个编码就是短网址的路径部分。 我设定的map字符串内容为"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"。可以满足路径部分只能是5位数字+字母的组合。

2.访问短网址时，重定向用户到原网址

实现：在这里调用了restful.api，在服务器端获得短网址之后会在数据库中查询对应的长网址，并在返回http 301后，重定向用户到长地址。

