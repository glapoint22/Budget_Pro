CREATE TYPE List
AS TABLE
(
	ID UNIQUEIDENTIFIER,
	name VARCHAR(20),
	type int,
	currency float,
	freq int,
	dayOfWeek int,
	dayOfMonth1 int,
	dayOfMonth2 int,
	month1 int,
	month2 int,
	periodStart date,
	listType int
)




Create Proc CreateAccount
(
	--Users Table
	@fname VARCHAR(30),
	@lname VARCHAR(30),
	@email VARCHAR(30),
	@pword VARCHAR(30),
	@list AS List READONLY
)
AS
BEGIN
	SET NOCOUNT ON
	DECLARE @userID uniqueidentifier
	SET @userID = NEWID()

	INSERT INTO Users
	VALUES (@userID, @fname, @lname, @email, @pword)

	INSERT INTO Employers
	SELECT ID, name, type, currency, @userID
	FROM @list
	WHERE listType = 0

	INSERT INTO Envelopes
	SELECT ID, name, type, currency, @userID
	FROM @list
	WHERE listType = 1

	INSERT INTO Period
	(Frequency, DayOfWeek, DayOfMonth1, DayOfMonth2, Month1, Month2, PeriodStart, EmployerID)
	SELECT freq, dayOfWeek, dayOfMonth1, dayOfMonth2, month1, month2, periodStart, ID
	FROM @list
	WHERE listType = 0

	INSERT INTO Period
	(Frequency, DayOfWeek, DayOfMonth1, DayOfMonth2, Month1, Month2, PeriodStart, EnvelopeID)
	SELECT freq, dayOfWeek, dayOfMonth1, dayOfMonth2, month1, month2, periodStart, ID
	FROM @list
	WHERE listType = 1
END

select * from Employers
select * from Period
select * from Users
select * from Envelopes

delete Employers
delete Period
delete Envelopes
delete Users

create table Envelopes
(
	EnvelopeID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
	Name VARCHAR(30) NOT NULL,
	EnvelopeType int NOT NULL,
	Amount float NOT NULL,
	UserID UNIQUEIDENTIFIER NOT NULL,
	FOREIGN KEY (UserID) REFERENCES Users(ID)
)








